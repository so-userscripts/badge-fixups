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
    const isOn = state === "on";

    badgeStyle.overflow = isOn ? "hidden" : "unset";
    //@see https://stackoverflow.com/a/20566810/11407695
    badgeStyle.verticalAlign = isOn ? "bottom" : "unset";
    badgeStyle.maxWidth = isOn ? "150px" : "unset";
    columnStyle.zIndex = isOn ? "unset" : "2";
  };

  const getBadgeItem = (badge: HTMLElement) =>
    badge.classList.contains(badge_tag) &&
    badge.closest<HTMLElement>(grid_cell);

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
    const badgeitem = getBadgeItem(target);
    badgeitem && toggleOverflow(badgeitem, target, "off");
  });

  d.addEventListener("mouseout", ({ target }) => {
    const badgeitem = getBadgeItem(target);
    badgeitem && toggleOverflow(badgeitem, target, "on");
  });
})(window, document);
