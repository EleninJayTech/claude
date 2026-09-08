#!/usr/bin/env python3
"""docs/features/ 상태 점검. 프로젝트 루트에서 실행. 표준 라이브러리만 사용."""
import argparse, json, os, re, subprocess, sys

DOCS = "docs/features"
TAGS = ["[미확인]", "[화면 미확인]", "[코드만 확인]", "[화면만 확인]", "[출처 불명]", "[숨김/비활성 추정]"]

def git(*a):
    try:
        return subprocess.check_output(["git", "-c", "core.quotepath=false", *a], stderr=subprocess.DEVNULL, text=True).strip()
    except Exception:
        return ""

def frontmatter(text):
    if not text.startswith("---"):
        return {}, text
    parts = text.split("---", 2)
    if len(parts) < 3:
        return {}, text
    fm = {}
    for line in parts[1].splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            fm[k.strip()] = v.strip()
    return fm, parts[2]

def section(body, title):
    m = re.search(r"^## " + re.escape(title) + r"\s*$(.*?)(?=^## |\Z)", body, re.S | re.M)
    return m.group(1) if m else ""

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--threshold", type=int, default=5)
    args = ap.parse_args()
    if not os.path.isdir(DOCS):
        print(json.dumps({"error": f"{DOCS} 없음"}, ensure_ascii=False)); sys.exit(1)

    head = git("rev-parse", "--short", "HEAD")
    ver = {}
    vp = os.path.join(DOCS, "VERSION.md")
    if os.path.exists(vp):
        for line in open(vp, encoding="utf-8"):
            if ":" in line and not line.startswith("|"):
                k, v = line.split(":", 1); ver[k.strip()] = v.strip()

    inv_ids = set()
    ip = os.path.join(DOCS, "00_inventory.md")
    if os.path.exists(ip):
        inv_ids = set(re.findall(r"\bF-\d{3,}\b", open(ip, encoding="utf-8").read()))
    idx_tcs = set()
    tp = os.path.join(DOCS, "03_test_index.md")
    if os.path.exists(tp):
        idx_tcs = set(re.findall(r"\bTC-F\d{3,}-\d+\b", open(tp, encoding="utf-8").read()))

    docs, stale, pending, broken, tc_missing_in_index, appver_mismatch = [], [], [], [], [], []
    file_ids, doc_tcs = set(), set()
    for fn in sorted(os.listdir(DOCS)):
        if not re.match(r"F-\d{3,}_.*\.md$", fn):
            continue
        text = open(os.path.join(DOCS, fn), encoding="utf-8").read()
        fm, body = frontmatter(text)
        fid = fm.get("id", fn.split("_")[0]); file_ids.add(fid)
        status = fm.get("status", "")
        vc = fm.get("verified_commit", "")
        behind, changed_refs = None, []
        refs = re.findall(r"`([^`:\s]+(?:\.[A-Za-z0-9]+)?)(?::\d+)?`", section(body, "코드 참조"))
        refs = [r for r in refs if "/" in r or "\\" in r or "." in r]
        missing = [r for r in refs if not os.path.exists(r)]
        if vc and head:
            cnt = git("rev-list", "--count", f"{vc}..HEAD")
            behind = int(cnt) if cnt.isdigit() else None
            if behind:
                touched = set(git("diff", "--name-only", f"{vc}..HEAD").splitlines())
                changed_refs = [r for r in refs if r in touched]
        tcs = set(re.findall(r"\bTC-F\d{3,}-\d+\b", body)); doc_tcs |= tcs
        tags = [t for t in TAGS if t in body]
        rec = {"id": fid, "file": fn, "status": status, "verified_commit": vc,
               "behind": behind, "changed_refs": changed_refs, "app_version": fm.get("app_version", "")}
        docs.append(rec)
        if behind is not None and behind >= args.threshold or changed_refs:
            stale.append({**rec, "priority": (behind or 0) * (1 + len(changed_refs))})
        if status not in ("확인됨", "폐기") or tags:
            pending.append({"id": fid, "status": status, "tags": tags})
        if missing:
            broken.append({"id": fid, "missing": missing})
        for tc in tcs - idx_tcs:
            tc_missing_in_index.append(tc)
        av = ver.get("app_version", "")
        if av and rec["app_version"] and rec["app_version"] not in av:
            appver_mismatch.append({"id": fid, "doc": rec["app_version"], "set": av})

    out = {
        "head": head, "docs_version": ver.get("docs_version", ""), "set_repo_commit": ver.get("repo_commit", ""),
        "threshold": args.threshold, "total": len(docs),
        "confirmed": sum(1 for d in docs if d["status"] == "확인됨"),
        "stale": sorted(stale, key=lambda d: -d["priority"]),
        "pending": pending, "broken_refs": broken,
        "inventory_without_file": sorted(inv_ids - file_ids),
        "file_without_inventory": sorted(file_ids - inv_ids),
        "tc_not_in_index": sorted(set(tc_missing_in_index)),
        "index_tc_without_doc": sorted(idx_tcs - doc_tcs),
        "app_version_mismatch": appver_mismatch,
    }
    print(json.dumps(out, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
