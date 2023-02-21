export const breakpoints = {
    mobile: 481,
    tablet: 768,
    laptop: 950,
    desktop: 1025,
}

export const validateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true
    }
    return false
}

