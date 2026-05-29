import { styleParser } from "./parser.js";

export function applyMyStyles(root = document) {
  styleParser(root);

  const body = root.body || root;

  const observer = new MutationObserver(() => {
    styleParser(root);
  });

  observer.observe(body, {
    attributes: true,
    childList: true,
    subtree: true,
    attributeFilter: ["class"]
  });

  return observer;
}