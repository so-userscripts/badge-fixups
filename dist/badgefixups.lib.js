"use strict";
((_w, d) => {
    const grid_cell = ".grid--cell";
    const badge_tag = "badge-tag";
    const badges = [...d.getElementsByClassName(badge_tag)];
    const toggleOverflow = ({ style: columnStyle }, { style: badgeStyle }, state) => {
        const isOn = state === "on";
        badgeStyle.overflow = isOn ? "hidden" : "unset";
        badgeStyle.verticalAlign = isOn ? "bottom" : "unset";
        badgeStyle.maxWidth = isOn ? "150px" : "unset";
        columnStyle.zIndex = isOn ? "unset" : "2";
    };
    const getBadgeItem = (badge) => badge.classList.contains(badge_tag) &&
        badge.closest(grid_cell);
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
        const badgeitem = getBadgeItem(target);
        badgeitem && toggleOverflow(badgeitem, target, "off");
    });
    d.addEventListener("mouseout", ({ target }) => {
        const badgeitem = getBadgeItem(target);
        badgeitem && toggleOverflow(badgeitem, target, "on");
    });
})(window, document);
