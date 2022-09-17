const dayjs = require('dayjs')
const dayjsPluginUTC = require('dayjs/plugin/utc')
const md5 = require('js-md5')

dayjs.extend(dayjsPluginUTC)

const counter = (content) => {
    const cn = (content.match(/[\u4E00-\u9FA5]/g) || []).length;
    const en = (content.replace(/[\u4E00-\u9FA5]/g, '').match(/[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|[\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6]+|\w+/g) || []).length;
    return [cn, en];
};
const calcReadingTime = (content, {cn = 300, en = 160} = {}) => {
    const len = counter(content);
    const readingTime = len[0] / cn + len[1] / en;
    return readingTime < 1 ? '1' : parseInt(readingTime, 10);
}
const wordcount = (content) => {
    const len = counter(content);
    const count = len[0] + len[1];
    if (count < 1000) {
        return count;
    }
    return Math.round(count / 100) / 10 + 'k';
}

const timeAgo = (dateTimeStamp) => {
    //转换为时间戳
    let thisTime = dateTimeStamp;
    thisTime = thisTime.replace(/-/g, '/');
    let time = new Date(thisTime);
    time = time.getTime();
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const now = new Date().getTime();
    const diffValue = now - time;
    if (diffValue < 0) {
        return;
    }
    const monthC = diffValue / month;
    const weekC = diffValue / (7 * day);
    const dayC = diffValue / day;
    let result = ''
    if (monthC >= 1) {
        result = "" + parseInt(monthC) + "月前";
    } else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
        result = parseInt(dayC) < 2 ? "最近" : "" + parseInt(dayC) + "天前";
    } else {
        result = "刚刚";
    }
    return result
}

const encode = (str) => {
    //定义密钥，36个字母和数字
    const key = "ABC012DEF345GHI678JKL9MNOPQRSTUVWXYZ";
    const l = key.length;
    const a = key.split(""); //把密钥字符串转换为字符数组
    let s = "", b, b1, b2, b3; //定义临时变量
    for (let i = 0; i < 3; i++) {
        b = str.charCodeAt(i); //逐个提取每个字符，并获取Unicode编码值
        b1 = b % l; //求Unicode编码值得余数
        b = (b - b1) / l; //求最大倍数
        b2 = b % l; //求最大倍数的于是
        b = (b - b2) / l; //求最大倍数
        b3 = b % l; //求最大倍数的余数
        s += a[b3] + a[b2] + a[b1]; //根据余数值映射到密钥中对应下标位置的字符
    }
    return s.toLocaleLowerCase();
}

module.exports = (options = {}, context) => {
    return {
        name: 'qblog-theme-utils',
        extendPageData($page) {
            if ($page.path === '/archives/') {
                return $page.pageType = 'archive';
            } else if ($page.path === '/categories/') {
                return $page.pageType = 'category';
            } else if (/^\/categories\/\w/.test($page.path)) {
                return $page.pageType = 'categoryItem';
            } else if ($page.path === '/tags/') {
                return $page.pageType = 'tag';
            } else if (/^\/tags\/\w/.test($page.path)) {
                return $page.pageType = 'tagItem';
            } else if ($page.path === '/' || $page.path.startsWith('/page/')) {
                return $page.pageType = 'home';
            } else if ($page.path === '/link/') {
                return $page.pageType = 'link';
            } else if ($page.path === '/about/') {
                return $page.pageType = 'about';
            }
            if ($page.pid === 'post') {
                const {_strippedContent} = $page;
                let content = _strippedContent.replace(/\s/g, '');
                $page.wordCount = wordcount(content);
                $page.readingTime = calcReadingTime(content, context.themeConfig.wordPerminute);
                $page.timeAgo = timeAgo(dayjs.utc($page.frontmatter.date).format('YYYY-MM-DD'))
                $page.frontmatter.permalink = `/p/${encode(md5($page.frontmatter.title))}.html`
            }
        },
        additionalPages() {
            return [
                {
                    path: '/archives/',
                    frontmatter: {
                        title: 'Archive'
                    }
                },
                {
                    path: '/about/',
                    frontmatter: {
                        title: '关于本站'
                    }
                }
            ];
        }
    }
}