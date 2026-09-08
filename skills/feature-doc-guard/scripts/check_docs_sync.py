#!/usr/bin/env python3
"""스테이징된 소스 변경에 대응하는 docs/features/ 문서가 함께 스테이징됐는지 검사.
종료 0 = 통과, 1 = 누락 있음. 표준 라이브러리만 사용."""
import json, os, re, subprocess, sys

DOCS = "docs/features"
SKIP_PREFIX = ("docs/", ".claude/", ".github/", "test/", "tests/", "__tests__/", "spec/")
SKIP_NAME = re.compile(r"(package-lock\.json|yarn\.lock|pnpm-lock\.yaml|\.md|\.txt|\.lock|\.png|\.jpg|\.svg|\.ico)$")

def git(*a):
    return subprocess.check_output(["git", "-c", "core.quotepath=false", *a], text=True, stderr=subprocess.DEVNULL).strip()

def norm(p):
    return p.replace("\\", "/").strip().strip("`")

def load_mapping():
    """{F-id: set(paths)}"""
    m = {}
    ip = os.path.join(DOCS, "00_inventory.md")
    if os.path.exists(ip):
        for line in open(ip, encoding="utf-8"):
            if not line.startswith("|"):
                continue
            cells = [c.strip() for c in line.strip().strip("|").split("|")]
            fid = next((c for c in cells if re.fullmatch(r"F-\d{3,}", c)), None)
            if not fid:
                continue
            for c in cells:
                for p in re.findall(r"[\w./\\-]+\.[A-Za-z0-9]+|[\w./\\-]+/", c):
                    m.setdefault(fid, set()).add(norm(p))
    for fn in os.listdir(DOCS) if os.path.isdir(DOCS) else []:
        if not re.match(r"F-\d{3,}_.*\.md$", fn):
            continue
        text = open(os.path.join(DOCS, fn), encoding="utf-8").read()
        fid = fn.split("_")[0]
        sec = re.search(r"^## 코드 참조\s*$(.*?)(?=^## |\Z)", text, re.S | re.M)
        if sec:
            for p in re.findall(r"`([^`\s]+?)(?::\d+)?`", sec.group(1)):
                if "." in p or "/" in p:
                    m.setdefault(fid, set()).add(norm(p))
    return m

def doc_file(fid):
    for fn in os.listdir(DOCS):
        if fn.startswith(fid + "_"):
            return f"{DOCS}/{fn}"
    return None

def main():
    if os.environ.get("FEATURE_DOC_GUARD") == "0":
        return 0
    if "--only-on-commit" in sys.argv:
        try:
            data = json.load(sys.stdin)
            cmd = data.get("tool_input", {}).get("command", "")
        except Exception:
            cmd = ""
        if "git commit" not in cmd:
            return 0
        if "[skip-doc]" in cmd:
            return 0
    if not os.path.isdir(DOCS):
        return 0
    staged = [norm(p) for p in git("diff", "--cached", "--name-only").splitlines()]
    src = [p for p in staged if not p.startswith(SKIP_PREFIX) and not SKIP_NAME.search(p)]
    if not src:
        return 0
    mapping = load_mapping()
    affected, unmapped = {}, []
    for p in src:
        hits = [fid for fid, paths in mapping.items()
                if any(p == q or p.startswith(q.rstrip("/") + "/") or q.endswith(p) for q in paths)]
        if hits:
            for fid in hits:
                affected.setdefault(fid, []).append(p)
        else:
            unmapped.append(p)
    missing = {fid: files for fid, files in affected.items()
               if (doc_file(fid) or "") not in staged}
    if unmapped:
        print("[feature-doc-guard] 기능 문서에 매핑되지 않은 소스 (새 기능이면 /feature-docs sync):")
        for p in unmapped:
            print("   -", p)
    if missing:
        print("[feature-doc-guard] 코드는 바뀌었는데 기능 문서가 스테이징되지 않음:")
        for fid, files in missing.items():
            print(f"   {fid} ({doc_file(fid)}) <- {', '.join(files)}")
        print("   문서를 갱신하고 함께 add 하거나, /feature-docs sync 를 실행하세요.")
        print("   우회: FEATURE_DOC_GUARD=0 또는 커밋 명령에 [skip-doc]")
        return 1
    return 0

if __name__ == "__main__":
    sys.exit(main())
