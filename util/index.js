/**
 * 初始化图标
 * @param nav
 * @returns {Promise<boolean>}
 */
const initIcon = async (nav) => {
    const icons = []
    const {library} = await import('@fortawesome/fontawesome-svg-core')
    const fasIcons = await import( '@fortawesome/free-solid-svg-icons');
    const fabIcons = await import( '@fortawesome/free-brands-svg-icons');
    const handler = (str) => {
        let arr = str.split(`-`);
        let newArr = arr.map(ele => {
            return ele[0].toUpperCase() + ele.slice(1)
        })
        return newArr.join(``);
    }

    nav.forEach(el => {
        if (el.items) {
            el.items.forEach(els => {
                if (els.icon) icons.push(`fa${handler(els.icon)}`)
            })
        }
    })

    library.add(
        fabIcons['faHotjar'],
        fasIcons['faFileWord'],
        fasIcons['faStopwatch'],
        fasIcons['faCalendar'],
        fasIcons['faCompass'],
        fasIcons['faLocationDot'],
        fasIcons['faMessage'],
        fasIcons['faArrowCircleRight'],
        fasIcons['faArrowRight'],
        fasIcons['faDove'],
        fasIcons['faBurn'],
        fasIcons['faBook'],
        fasIcons['faCirclePlus'],
        fabIcons['faGithub'],
        fasIcons['faEnvelope'],
        fasIcons['faFaceMeh'],
        fasIcons['faAddressCard'],
        fasIcons['faXmark'],
        fasIcons['faHeart'],
        fasIcons['faSquareArrowUpRight'],
        fasIcons['faTrainSubway'],
        fasIcons['faMagnifyingGlass']
    )

    for (const key in icons) {
        library.add(
            fasIcons[icons[key]]
        )
    }
    return true
}

export {
    initIcon
}
