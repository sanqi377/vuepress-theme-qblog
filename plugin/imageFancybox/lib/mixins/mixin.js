import "@fancyapps/ui/dist/fancybox.css";
import {Fancybox} from "@fancyapps/ui/src/Fancybox/Fancybox.js";

export default {
    mounted() {
        Fancybox.bind('.single-content img', {
            infinite: false,
            parentEl: document.querySelector('[data-fancybox="gallery"]')
        });
    },
};
