interface MouseEvent extends Event {
  readonly target: HTMLElement;
}

interface Document
  extends Node,
    DocumentAndElementEventHandlers,
    DocumentOrShadowRoot,
    GlobalEventHandlers,
    NonElementParentNode,
    ParentNode,
    XPathEvaluatorBase {
  getElementsByClassName<T extends Element>(
    classNames: string
  ): HTMLCollectionOf<T>;
}

((_w, d) => {
  const grid_cell = ".grid--cell";
  const badge_tag = "badge-tag";

  const badges = [...d.getElementsByClassName<HTMLElement>(badge_tag)];

  const toggleOverflow = (
    { style: columnStyle }: HTMLElement,
    { style: badgeStyle }: HTMLElement,
    state: "on" | "off"
  ) => {
    badgeStyle.overflow = state === "on" ? "hidden" : "unset";
    //@see https://stackoverflow.com/a/20566810/11407695
    badgeStyle.verticalAlign = state === "on" ? "bottom" : "unset";
    badgeStyle.maxWidth = state === "on" ? "150px" : "unset";
    columnStyle.zIndex = state === "on" ? "unset" : "2";
  };

  badges.forEach((badge) => {
    const badgeitem = badge.closest<HTMLElement>(grid_cell);
    if (!badgeitem) return;
    const { nextElementSibling: dateitem } = badgeitem;
    if (!dateitem) return;

    (dateitem as HTMLElement).style.zIndex = "1";
    badgeitem.style.maxWidth = "50%";

    toggleOverflow(badgeitem, badge, "on");
  });

  d.addEventListener("mouseover", ({ target }) => {
    if (!target.classList.contains(badge_tag)) return;
    const badgeitem = target.closest<HTMLElement>(grid_cell);
    if (!badgeitem) return;

    toggleOverflow(badgeitem, target, "off");
  });

  d.addEventListener("mouseout", ({ target }) => {
    if (!target.classList.contains(badge_tag)) return;
    const badgeitem = target.closest<HTMLElement>(grid_cell);
    if (!badgeitem) return;

    toggleOverflow(badgeitem, target, "on");
  });
})(window, document);
