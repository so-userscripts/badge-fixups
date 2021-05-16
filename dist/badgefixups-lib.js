"use strict";
((_w, d) => {
    const grid_cell = ".grid--cell";
    const badge_tag = "badge-tag";
    const badges = [...d.getElementsByClassName(badge_tag)];
    const toggleOverflow = ({ style: columnStyle }, { style: badgeStyle }, state) => {
        badgeStyle.overflow = state === "on" ? "hidden" : "unset";
        badgeStyle.verticalAlign = state === "on" ? "bottom" : "unset";
        badgeStyle.maxWidth = state === "on" ? "150px" : "unset";
        columnStyle.zIndex = state === "on" ? "unset" : "2";
    };
    badges.forEach((badge) => {
        const badgeitem = badge.closest(grid_cell);
        if (!badgeitem)
            return;
        const { nextElementSibling: dateitem } = badgeitem;
        if (!dateitem)
            return;
        dateitem.style.zIndex = "1";
        badgeitem.style.maxWidth = "50%";
        toggleOverflow(badgeitem, badge, "on");
    });
    d.addEventListener("mouseover", ({ target }) => {
        if (!target.classList.contains(badge_tag))
            return;
        const badgeitem = target.closest(grid_cell);
        if (!badgeitem)
            return;
        toggleOverflow(badgeitem, target, "off");
    });
    d.addEventListener("mouseout", ({ target }) => {
        if (!target.classList.contains(badge_tag))
            return;
        const badgeitem = target.closest(grid_cell);
        if (!badgeitem)
            return;
        toggleOverflow(badgeitem, target, "on");
    });
})(window, document);
