<template>
    <div id="gallery01" class="style1 gallery">
        <div class="inner">
            <ul>
                <li>
                    <span class="frame">
                        <img src="@/assets/images/signup/galary/galary-1.png"
                            alt="Untitled" />
                    </span>
                </li>
                <li>
                    <span class="frame">
                        <img src="@/assets/images/signup/galary/galary-2.png"
                            alt="Untitled" />
                    </span>
                </li>
                <li>
                    <span class="frame">
                        <img src="@/assets/images/signup/galary/galary-3.png"
                            alt="Untitled" />
                    </span>
                </li>
                <li>
                    <span class="frame">
                        <img src="@/assets/images/signup/galary/galary-4.png"
                            alt="Untitled" />
                    </span>
                </li>
                <li>
                    <span class="frame">
                        <img src="@/assets/images/signup/galary/galary-5.png"
                            alt="Untitled" />
                    </span>
                </li>
                <li>
                    <span class="frame">
                        <img src="@/assets/images/signup/galary/galary-7.png"
                            alt="Untitled" />
                    </span>
                </li>
                <li>
                    <span class="frame deferred">
                        <img src="@/assets/images/signup/galary/galary-8.png"
                            alt="Untitled" />
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>

export default {
    name: 'Gallert01',
    props: {
        images: {
            type: [Object],
            required: true,
        },
    },

};
</script>

<style>
.image {
    display: block;
    line-height: 0;
    max-width: 100%;
    position: relative;
}

.image .frame {
    -webkit-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    vertical-align: top;
    width: 100%;
}

.image .frame img {
    border-radius: 0 !important;
    max-width: 100%;
    vertical-align: top;
    width: inherit;
}

.image.full .frame {
    display: block;
}

.image.full:first-child .frame {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}

.image.full:last-child .frame {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
}

.image.style1 .frame {
    width: 100vw;
    transition: none;
}

.image.style1 img {
    height: 100% !important;
    object-fit: cover;
    object-position: center;
    width: 100% !important;
}

.image.style1 .frame img {
    transition: none;
}

.gallery .inner {
    display: inline-block;
    max-width: 100%;
    vertical-align: middle;
}

.gallery ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: var(--flex-alignment);
}

.gallery ul li {
    position: relative;
}

.gallery ul li .thumbnail {
    border-radius: inherit;
    position: relative;
}

.gallery ul li .frame {
    -webkit-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    display: inline-block;
    overflow: hidden;
    vertical-align: top;
}

.gallery ul li img {
    margin: 0;
    max-width: 100%;
    vertical-align: top;
    width: auto;
}

.gallery ul li .caption {
    width: 100%;
}

.gallery ul li .caption p {
    width: 100%;
}

.gallery ul li .caption a,
.gallery ul li .caption spoiler-text {
    pointer-events: auto;
}

.gallery.style1 .inner {
    max-width: 100%;
    width: 100%;
}

.gallery.style1 ul li {
    border-radius: 0rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
}

.gallery.style1 ul li .frame {
    border-radius: 0rem;
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
}

.gallery.style1 ul {
    gap: 0rem;
}

.gallery.style1 ul li img {
    display: block;
    flex-grow: 1;
    flex-shrink: 1;
    height: 14.25rem;
    object-fit: cover;
    object-position: center;
}

.gallery.style1 ul li .thumbnail {
    transition: none;
}

.gallery.style1 ul li .thumbnail img {
    transition: none;
}

#gallery01 ul li .n01 img {
    object-position: center;
}

#gallery01 ul li .n02 img {
    object-position: center;
}

#gallery01 ul li .n03 img {
    object-position: center;
}

#gallery01 ul li .n04 img {
    object-position: center;
}

#gallery01 ul li .n05 img {
    object-position: center;
}

#gallery01 ul li .n06 img {
    object-position: center;
}

#gallery01 ul li .n07 img {
    object-position: center;
}


@media (max-width: 736px) {

    .image.style1 .frame {
        height: 14rem !important;
    }

    .gallery.style1 ul {
        gap: 0rem;
    }

    .icons.style1 {
        gap: 0.75rem;
    }
}
</style>