export const cursor = {
    ptr: "pointer",
    NA: "not-allowed",
    text: "text",
    help: "help",
    move: "move",
    grab: "grab",
    crosshair: "crosshair",
    wait: "wait"
}

export const position = {
    abs: "absolute",
    rel: "relative",
    fixed: "fixed",
    sticky: "sticky",
}

export const display = {
    none: "none",
    flex: "flex",
    grid: "grid",
    block: "block",
    inline: "inline",
    "inline-block": "inline-block",
}

export const colors = {
    black: "black",
    white: "white",
    red: "red",
    green: "green",
    blue: "blue",
    yellow: "yellow",
    purple: "purple",
    orange: "orange",
    pink: "pink",
    gray: "gray",
    silver: "silver"
}

export const valueMaps = {
    bg: "background-color",
    text: "color",
    w: "width",
    h: "height",
    wmin: "min-width",
    wmax: "max-width",
    hmin: "min-height",
    hmax: "max-height",

    op: "opacity",
    ovr: "overflow",



    p: "padding",
    pt: "padding-top",
    pr: "padding-right",
    pb: "padding-bottom",
    pl: "padding-left",

    m: "margin",
    mt: "margin-top",
    mr: "margin-right",
    mb: "margin-bottom",
    ml: "margin-left",
    mx: "margin-x",
    my: "margin-y",

    cur: cursor,

    fix: position,
    t: "top",
    r: "right",
    b: "bottom",
    l: "left",
    z: "z-index",

    f: "font-size",
    fw: "font-weight",

    dp: display,
    flex: "flex-direction",
    justify: "justify-content",
    items: "align-items",
    rows: "grid-template-rows",
    cols: "grid-template-columns",
    g: "gap",

    rounded: "border-radius",
    border: "border",
}

export const flexdirection = {
    col: "column",
    row: "row",
    "row-rev": "row-reverse",
    "col-rev": "column-reverse",
}

export const justifyMap = {
    center: "center",
    start: "start",
    end: "end",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly"
}

export const alignMap = {
    center: "center",
    start: "flex-start",
    end: "flex-end",
    stretch: "stretch",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly"
}

export const itemsMap = {
    center: "center",
    start: "flex-start",
    end: "flex-end",
    stretch: "stretch",
}

export const keyString = {
    cur: "cursor",
    dp: "display",
    fix: "position"
}
export const textutils = {
    center: "center",
    left: "left",
    right: "right",
    justify: "justify",

    uppercase: "uppercase",
    lowercase: "lowercase",
    capitalize: "capitalize",

    truncate: "truncate",
    ellipsis: "ellipsis",
}

export const overFlowMap = {
    hidden: "hidden",
    auto: "auto",
    scroll: "scroll",
    x: "overflow-x",
    y: "overflow-y",
}

export const textDecorationLineMap = {
    underline: "underline",
    overline: "overline",
    through: "line-through",
    none: "none"
}


export const spacingKeys = ["p", "pt", "pr", "pb", "pl", "m", "mt", "mr", "mb", "ml", "g", "mx","my"]
export const p = ["padding-top", "padding-right", "padding-bottom", "padding-left"]
export const m = ["margin-top", "margin-right", "margin-bottom", "margin-left"]


export const positionKeys = ["t", "r", "b", "l", "z"]

export const borderRadiusKeys = ["border-top-left-radius", "border-top-right-radius", "border-bottom-right-radius", "border-bottom-left-radius"]