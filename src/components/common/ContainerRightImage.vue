<template>
    <div class="wrapper style1 container columns">
        <div class="row inner pe-0 ps-0">
            <div class="col-md-6 col-sm-12">
                <span class="frame deferred">
                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjAiIHk9IjAiIHZpZXdCb3g9IjAgMCAxNTYwIDE1MTYiIHdpZHRoPSIxNTYwIiBoZWlnaHQ9IjE1MTYiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxyZWN0IGZpbGw9IiM3MzcyNzQiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiLz48L3N2Zz4%3D"
                        class="w-100" alt="" />
                </span>
            </div>
            <div class="col-md-6 col-sm-12 mt-5 mb-5">
                <h2 id="text07" class="style5">
                    <span class="p">
                        Lorem ipsum<br />dolor sit amet
                    </span>
                </h2>
                <p id="text08" class="style6">Tortor faucibus ullamcorper nec tempus purus sed
                    penatibus. Lacinia pellentesque eleifend vitae est elit tristique velit tempus
                    etiam.</p>
            </div>
        </div>
    </div>


</template>
<script>

export default {
    name: 'Container Right Image',
    props: {
        images: {
            type: [Object],
            required: true,
        },
        headText: {
            type: [String],
            required: true,
        },
        text: {
            type: [String],
            required: true,
        },
    },

};
</script>

<style>
#wrapper {
    -webkit-overflow-scrolling: touch;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: var(--viewport-height);
    overflow: hidden;
    position: relative;
    z-index: 2;
}


@keyframes loading-spinner {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.deferred:before {
    content: '';
    display: block;
    width: 4rem;
    height: 4rem;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -2rem 0 0 -2rem;
    animation: loading-spinner 1s infinite linear;
    transition: opacity 0.25s ease;
    transition-delay: 0.5s;
    opacity: 0;
    z-index: -1;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iOTZweCIgaGVpZ2h0PSI5NnB4IiB2aWV3Qm94PSIwIDAgOTYgOTYiIHpvb21BbmRQYW49ImRpc2FibGUiPjxzdHlsZT5jaXJjbGUge2ZpbGw6IHRyYW5zcGFyZW50OyBzdHJva2U6ICNmZmY7IHN0cm9rZS13aWR0aDogMS41cHg7IH08L3N0eWxlPjxkZWZzPjxjbGlwUGF0aCBpZD0iY29ybmVyIj48cG9seWdvbiBwb2ludHM9IjAsMCA0OCwwIDQ4LDQ4IDk2LDQ4IDk2LDk2IDAsOTYiIC8+PC9jbGlwUGF0aD48L2RlZnM+PGcgY2xpcC1wYXRoPSJ1cmwoI2Nvcm5lcikiPjxjaXJjbGUgY3g9IjQ4IiBjeT0iNDgiIHI9IjMyIi8+PC9nPjwvc3ZnPg==');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 3rem;
}

.deferred.loading:before {
    opacity: 0.35;
    z-index: 0;
}

h1,
h2,
h3,
p {
    direction: var(--site-language-direction);
    position: relative;
}

h1 span.p,
h2 span.p,
h3 span.p,
p span.p {
    display: block;
    position: relative;
}

h1 span[style],
h2 span[style],
h3 span[style],
p span[style],
h1 strong,
h2 strong,
h3 strong,
p strong,
h1 a,
h2 a,
h3 a,
p a {
    -webkit-text-fill-color: currentcolor;
}

h1.style3,
h2.style3,
h3.style3,
p.style3 {
    text-transform: uppercase;
    color: #1D1A55;
    font-family: 'Tajawal', sans-serif;
    width: calc(100% + 0.4rem);
    font-size: 2em;
    line-height: 1;
    font-weight: 600;
}

h1.style3 a,
h2.style3 a,
h3.style3 a,
p.style3 a {
    text-decoration: underline;
}

h1.style3 a:hover,
h2.style3 a:hover,
h3.style3 a:hover,
p.style3 a:hover {
    text-decoration: none;
}

h1.style3 span.p:nth-child(n + 2),
h2.style3 span.p:nth-child(n + 2),
h3.style3 span.p:nth-child(n + 2),
p.style3 span.p:nth-child(n + 2) {
    margin-top: 1rem;
}

h1.style1,
h2.style1,
h3.style1,
p.style1 {
    text-transform: uppercase;
    color: #FFFFFF;
    font-family: 'Tajawal', sans-serif;
    width: calc(100% + 0.4rem);
    font-size: 1.75em;
    line-height: 1.5;
    font-weight: 400;
}

h1.style1 a,
h2.style1 a,
h3.style1 a,
p.style1 a {
    text-decoration: underline;
}

h1.style1 a:hover,
h2.style1 a:hover,
h3.style1 a:hover,
p.style1 a:hover {
    text-decoration: none;
}

h1.style1 span.p:nth-child(n + 2),
h2.style1 span.p:nth-child(n + 2),
h3.style1 span.p:nth-child(n + 2),
p.style1 span.p:nth-child(n + 2) {
    margin-top: 1rem;
}

h1.style2,
h2.style2,
h3.style2,
p.style2 {
    text-align: center;
    color: #FFFFFF;
    font-family: 'Tajawal', sans-serif;
    width: calc(100% + 0.05rem);
    font-size: 1em;
    line-height: 1.75;
    font-weight: 300;
}

h1.style2 a,
h2.style2 a,
h3.style2 a,
p.style2 a {
    text-decoration: underline;
}

h1.style2 a:hover,
h2.style2 a:hover,
h3.style2 a:hover,
p.style2 a:hover {
    text-decoration: none;
}

h1.style2 span.p:nth-child(n + 2),
h2.style2 span.p:nth-child(n + 2),
h3.style2 span.p:nth-child(n + 2),
p.style2 span.p:nth-child(n + 2) {
    margin-top: 1rem;
}

h1.style4,
h2.style4,
h3.style4,
p.style4 {
    text-transform: uppercase;
    color: #1D1A55;
    font-family: 'Tajawal', sans-serif;
    width: calc(100% + 0.225rem);
    font-size: 1em;
    line-height: 1.5;
    font-weight: 300;
    text-align: center;
}

h1.style4 a,
h2.style4 a,
h3.style4 a,
p.style4 a {
    text-decoration: underline;
}

h1.style4 a:hover,
h2.style4 a:hover,
h3.style4 a:hover,
p.style4 a:hover {
    text-decoration: none;
}

h1.style4 span.p:nth-child(n + 2),
h2.style4 span.p:nth-child(n + 2),
h3.style4 span.p:nth-child(n + 2),
p.style4 span.p:nth-child(n + 2) {
    margin-top: 1rem;
}

h1.style5,
h2.style5,
h3.style5,
p.style5 {
    text-align: center;
    text-transform: uppercase;
    color: #1D1A55;
    font-family: 'Tajawal', sans-serif;
    letter-spacing: 0.4rem;
    width: calc(100% + 0.4rem);
    font-size: 1.375em;
    line-height: 1.5;
    font-weight: 400;
}

h1.style5 a,
h2.style5 a,
h3.style5 a,
p.style5 a {
    text-decoration: underline;
}

h1.style5 a:hover,
h2.style5 a:hover,
h3.style5 a:hover,
p.style5 a:hover {
    text-decoration: none;
}

h1.style5 span.p:nth-child(n + 2),
h2.style5 span.p:nth-child(n + 2),
h3.style5 span.p:nth-child(n + 2),
p.style5 span.p:nth-child(n + 2) {
    margin-top: 1rem;
}


.container {
    position: relative;
}

.container>.wrapper {
    vertical-align: top;
    position: relative;
    max-width: 100%;
    border-radius: inherit;
}

.container>.wrapper>.inner {
    vertical-align: top;
    position: relative;
    max-width: 100%;
    border-radius: inherit;
    text-align: var(--alignment);
}

.container.style7 {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-attachment: scroll;
    background-color: #1D1A55;
}

.container.style7>.wrapper>.inner {
    --gutters: 2rem;
    --padding-horizontal: 2rem;
    --padding-vertical: 6rem;
    --spacing: 1.5rem;
    padding: var(--padding-vertical) var(--padding-horizontal);
}

.container.style7>.wrapper {
    max-width: 30rem;
    width: 100%;
}

.container.style7.default>.wrapper>.inner>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style7.default>.wrapper>.inner>*:first-child {
    margin-top: 0 !important;
}

.container.style7.default>.wrapper>.inner>*:last-child {
    margin-bottom: 0 !important;
}

.container.style7.columns>.wrapper>.inner {
    flex-wrap: wrap;
    display: flex;
    align-items: flex-start;
}

.container.style7.columns>.wrapper>.inner>* {
    flex-grow: 0;
    flex-shrink: 0;
    max-width: 100%;
    text-align: var(--alignment);
    padding: 0 0 0 var(--gutters);
}

.container.style7.columns>.wrapper>.inner>*>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style7.columns>.wrapper>.inner>*>*:first-child {
    margin-top: 0 !important;
}

.container.style7.columns>.wrapper>.inner>*>*:last-child {
    margin-bottom: 0 !important;
}

.container.style7.columns>.wrapper>.inner>*:first-child {
    margin-left: calc(var(--gutters) * -1);
}

.container.style7.default>.wrapper>.inner>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    max-width: none !important;
    width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
}

.container.style7.default>.wrapper>.inner>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style7.default>.wrapper>.inner>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
}

.container.style7.columns>.wrapper>.inner>div>.full {
    margin-left: calc(var(--gutters) * -0.5);
    max-width: none !important;
    width: calc(100% + var(--gutters) + 0.4725px);
}

.container.style7.columns>.wrapper>.inner>div:first-child>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style7.columns>.wrapper>.inner>div:last-child>.full {
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style7.columns>.wrapper>.inner>div>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
}

.container.style7.columns>.wrapper>.inner>div>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
}

.container.style7.columns>.wrapper>.inner>div:first-child,
.container.style7.columns>.wrapper>.inner>div:first-child>.full:first-child {
    border-top-left-radius: inherit;
}

.container.style7.columns>.wrapper>.inner>div:last-child,
.container.style7.columns>.wrapper>.inner>div:last-child>.full:first-child {
    border-top-right-radius: inherit;
}

.container.style7.columns>.wrapper>.inner>.full {
    align-self: stretch;
}

.container.style7.columns>.wrapper>.inner>.full:first-child {
    border-bottom-left-radius: inherit;
    border-top-left-radius: inherit;
}

.container.style7.columns>.wrapper>.inner>.full:last-child {
    border-bottom-right-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style7.columns>.wrapper>.inner>.full>.full:first-child:last-child {
    border-radius: inherit;
    height: calc(100% + (var(--padding-vertical) * 2));
}

.container.style7.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
    border-radius: inherit;
    height: 100%;
    position: absolute;
    width: 100%;
}

#container02 {
    background-image: url('@/assets/images/main/book-lineart.svg');
    background-position: 50% 100%;
    background-repeat: repeat;
    background-size: cover;

}

.container.style1 {
    --alignment: left;
    --flex-alignment: flex-start;
    --indent-left: 1;
    --indent-right: 0;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
}

.container.style1>.wrapper>.inner {
    --gutters: 6rem;
    --padding-horizontal: 3rem;
    --padding-vertical: 4rem;
    --spacing: 1.25rem;
    padding: var(--padding-vertical) var(--padding-horizontal);
}

.container.style1>.wrapper {
    max-width: var(--width);
    width: 100%;
}

.container.style1.default>.wrapper>.inner>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style1.default>.wrapper>.inner>*:first-child {
    margin-top: 0 !important;
}

.container.style1.default>.wrapper>.inner>*:last-child {
    margin-bottom: 0 !important;
}

.container.style1.columns>.wrapper>.inner {
    flex-wrap: wrap;
    display: flex;
    align-items: flex-start;
}

.container.style1.columns>.wrapper>.inner>* {
    flex-grow: 0;
    flex-shrink: 0;
    max-width: 100%;
    text-align: var(--alignment);
    padding: 0 0 0 var(--gutters);
}

.container.style1.columns>.wrapper>.inner>*>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style1.columns>.wrapper>.inner>*>*:first-child {
    margin-top: 0 !important;
}

.container.style1.columns>.wrapper>.inner>*>*:last-child {
    margin-bottom: 0 !important;
}

.container.style1.columns>.wrapper>.inner>*:first-child {
    margin-left: calc(var(--gutters) * -1);
}

.container.style1.default>.wrapper>.inner>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    max-width: none !important;
    width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
}

.container.style1.default>.wrapper>.inner>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style1.default>.wrapper>.inner>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
}

.container.style1.columns>.wrapper>.inner>div>.full {
    margin-left: calc(var(--gutters) * -0.5);
    max-width: none !important;
    width: calc(100% + var(--gutters) + 0.4725px);
}

.container.style1.columns>.wrapper>.inner>div:first-child>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style1.columns>.wrapper>.inner>div:last-child>.full {
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style1.columns>.wrapper>.inner>div>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
}

.container.style1.columns>.wrapper>.inner>div>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
}

.container.style1.columns>.wrapper>.inner>div:first-child,
.container.style1.columns>.wrapper>.inner>div:first-child>.full:first-child {
    border-top-left-radius: inherit;
}

.container.style1.columns>.wrapper>.inner>div:last-child,
.container.style1.columns>.wrapper>.inner>div:last-child>.full:first-child {
    border-top-right-radius: inherit;
}

.container.style1.columns>.wrapper>.inner>.full {
    align-self: stretch;
}

.container.style1.columns>.wrapper>.inner>.full:first-child {
    border-bottom-left-radius: inherit;
    border-top-left-radius: inherit;
}

.container.style1.columns>.wrapper>.inner>.full:last-child {
    border-bottom-right-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style1.columns>.wrapper>.inner>.full>.full:first-child:last-child {
    border-radius: inherit;
    height: calc(100% + (var(--padding-vertical) * 2));
}

.container.style1.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
    border-radius: inherit;
    height: 100%;
    position: absolute;
    width: 100%;
}

#container04>.wrapper>.inner> :nth-child(1) {
    width: calc(50% + (var(--gutters) / 2));
}

#container04>.wrapper>.inner> :nth-child(2) {
    width: calc(50% + (var(--gutters) / 2));
}

.container.style5 {
    --alignment: left;
    --flex-alignment: flex-start;
    --indent-left: 1;
    --indent-right: 0;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
}

.container.style5>.wrapper>.inner {
    --gutters: 6rem;
    --padding-horizontal: 3rem;
    --padding-vertical: 4rem;
    --spacing: 1.25rem;
    padding: var(--padding-vertical) var(--padding-horizontal);
}

.container.style5>.wrapper {
    max-width: var(--width);
    width: 100%;
}

.container.style5.default>.wrapper>.inner>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style5.default>.wrapper>.inner>*:first-child {
    margin-top: 0 !important;
}

.container.style5.default>.wrapper>.inner>*:last-child {
    margin-bottom: 0 !important;
}

.container.style5.columns>.wrapper>.inner {
    flex-wrap: wrap;
    display: flex;
    align-items: flex-start;
}

.container.style5.columns>.wrapper>.inner>* {
    flex-grow: 0;
    flex-shrink: 0;
    max-width: 100%;
    text-align: var(--alignment);
    padding: 0 0 0 var(--gutters);
}

.container.style5.columns>.wrapper>.inner>*>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style5.columns>.wrapper>.inner>*>*:first-child {
    margin-top: 0 !important;
}

.container.style5.columns>.wrapper>.inner>*>*:last-child {
    margin-bottom: 0 !important;
}

.container.style5.columns>.wrapper>.inner>*:first-child {
    margin-left: calc(var(--gutters) * -1);
}

.container.style5.default>.wrapper>.inner>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    max-width: none !important;
    width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
}

.container.style5.default>.wrapper>.inner>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style5.default>.wrapper>.inner>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
}

.container.style5.columns>.wrapper>.inner>div>.full {
    margin-left: calc(var(--gutters) * -0.5);
    max-width: none !important;
    width: calc(100% + var(--gutters) + 0.4725px);
}

.container.style5.columns>.wrapper>.inner>div:first-child>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style5.columns>.wrapper>.inner>div:last-child>.full {
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style5.columns>.wrapper>.inner>div>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
}

.container.style5.columns>.wrapper>.inner>div>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
}

.container.style5.columns>.wrapper>.inner>div:first-child,
.container.style5.columns>.wrapper>.inner>div:first-child>.full:first-child {
    border-top-left-radius: inherit;
}

.container.style5.columns>.wrapper>.inner>div:last-child,
.container.style5.columns>.wrapper>.inner>div:last-child>.full:first-child {
    border-top-right-radius: inherit;
}

.container.style5.columns>.wrapper>.inner>.full {
    align-self: stretch;
}

.container.style5.columns>.wrapper>.inner>.full:first-child {
    border-bottom-left-radius: inherit;
    border-top-left-radius: inherit;
}

.container.style5.columns>.wrapper>.inner>.full:last-child {
    border-bottom-right-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style5.columns>.wrapper>.inner>.full>.full:first-child:last-child {
    border-radius: inherit;
    height: calc(100% + (var(--padding-vertical) * 2));
}

.container.style5.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
    border-radius: inherit;
    height: 100%;
    position: absolute;
    width: 100%;
}

#container03>.wrapper>.inner> :nth-child(1) {
    width: calc(50% + (var(--gutters) / 2));
}

#container03>.wrapper>.inner> :nth-child(2) {
    width: calc(50% + (var(--gutters) / 2));
}

.container.style2>.wrapper {
    display: inline-block;
    width: 26rem;
    background-color: #FFFFFF;
}

.container.style2>.wrapper>.inner {
    --gutters: 6rem;
    --padding-horizontal: 3rem;
    --padding-vertical: 3rem;
    --spacing: 1.25rem;
    padding: var(--padding-vertical) var(--padding-horizontal);
}

.container.style2.default>.wrapper>.inner>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style2.default>.wrapper>.inner>*:first-child {
    margin-top: 0 !important;
}

.container.style2.default>.wrapper>.inner>*:last-child {
    margin-bottom: 0 !important;
}

.container.style2.columns>.wrapper>.inner {
    flex-wrap: wrap;
    display: flex;
    align-items: flex-start;
}

.container.style2.columns>.wrapper>.inner>* {
    flex-grow: 0;
    flex-shrink: 0;
    max-width: 100%;
    text-align: var(--alignment);
    padding: 0 0 0 var(--gutters);
}

.container.style2.columns>.wrapper>.inner>*>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style2.columns>.wrapper>.inner>*>*:first-child {
    margin-top: 0 !important;
}

.container.style2.columns>.wrapper>.inner>*>*:last-child {
    margin-bottom: 0 !important;
}

.container.style2.columns>.wrapper>.inner>*:first-child {
    margin-left: calc(var(--gutters) * -1);
}

.container.style2.default>.wrapper>.inner>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    max-width: none !important;
    width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
}

.container.style2.default>.wrapper>.inner>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style2.default>.wrapper>.inner>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
}

.container.style2.columns>.wrapper>.inner>div>.full {
    margin-left: calc(var(--gutters) * -0.5);
    max-width: none !important;
    width: calc(100% + var(--gutters) + 0.4725px);
}

.container.style2.columns>.wrapper>.inner>div:first-child>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style2.columns>.wrapper>.inner>div:last-child>.full {
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style2.columns>.wrapper>.inner>div>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
}

.container.style2.columns>.wrapper>.inner>div>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
}

.container.style2.columns>.wrapper>.inner>div:first-child,
.container.style2.columns>.wrapper>.inner>div:first-child>.full:first-child {
    border-top-left-radius: inherit;
}

.container.style2.columns>.wrapper>.inner>div:last-child,
.container.style2.columns>.wrapper>.inner>div:last-child>.full:first-child {
    border-top-right-radius: inherit;
}

.container.style2.columns>.wrapper>.inner>.full {
    align-self: stretch;
}

.container.style2.columns>.wrapper>.inner>.full:first-child {
    border-bottom-left-radius: inherit;
    border-top-left-radius: inherit;
}

.container.style2.columns>.wrapper>.inner>.full:last-child {
    border-bottom-right-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style2.columns>.wrapper>.inner>.full>.full:first-child:last-child {
    border-radius: inherit;
    height: calc(100% + (var(--padding-vertical) * 2));
}

.container.style2.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
    border-radius: inherit;
    height: 100%;
    position: absolute;
    width: 100%;
}

.container.style3>.wrapper {
    display: inline-block;
    width: 35rem;
    background-color: #FFFFFF;
}

.container.style3>.wrapper>.inner {
    --gutters: 6rem;
    --padding-horizontal: 3rem;
    --padding-vertical: 4rem;
    --spacing: 1.25rem;
    padding: var(--padding-vertical) var(--padding-horizontal);
}

.container.style3.default>.wrapper>.inner>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style3.default>.wrapper>.inner>*:first-child {
    margin-top: 0 !important;
}

.container.style3.default>.wrapper>.inner>*:last-child {
    margin-bottom: 0 !important;
}

.container.style3.columns>.wrapper>.inner {
    flex-wrap: wrap;
    display: flex;
    align-items: flex-start;
}

.container.style3.columns>.wrapper>.inner>* {
    flex-grow: 0;
    flex-shrink: 0;
    max-width: 100%;
    text-align: var(--alignment);
    padding: 0 0 0 var(--gutters);
}

.container.style3.columns>.wrapper>.inner>*>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style3.columns>.wrapper>.inner>*>*:first-child {
    margin-top: 0 !important;
}

.container.style3.columns>.wrapper>.inner>*>*:last-child {
    margin-bottom: 0 !important;
}

.container.style3.columns>.wrapper>.inner>*:first-child {
    margin-left: calc(var(--gutters) * -1);
}

.container.style3.default>.wrapper>.inner>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    max-width: none !important;
    width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
}

.container.style3.default>.wrapper>.inner>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style3.default>.wrapper>.inner>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
}

.container.style3.columns>.wrapper>.inner>div>.full {
    margin-left: calc(var(--gutters) * -0.5);
    max-width: none !important;
    width: calc(100% + var(--gutters) + 0.4725px);
}

.container.style3.columns>.wrapper>.inner>div:first-child>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style3.columns>.wrapper>.inner>div:last-child>.full {
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style3.columns>.wrapper>.inner>div>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
}

.container.style3.columns>.wrapper>.inner>div>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
}

.container.style3.columns>.wrapper>.inner>div:first-child,
.container.style3.columns>.wrapper>.inner>div:first-child>.full:first-child {
    border-top-left-radius: inherit;
}

.container.style3.columns>.wrapper>.inner>div:last-child,
.container.style3.columns>.wrapper>.inner>div:last-child>.full:first-child {
    border-top-right-radius: inherit;
}

.container.style3.columns>.wrapper>.inner>.full {
    align-self: stretch;
}

.container.style3.columns>.wrapper>.inner>.full:first-child {
    border-bottom-left-radius: inherit;
    border-top-left-radius: inherit;
}

.container.style3.columns>.wrapper>.inner>.full:last-child {
    border-bottom-right-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style3.columns>.wrapper>.inner>.full>.full:first-child:last-child {
    border-radius: inherit;
    height: calc(100% + (var(--padding-vertical) * 2));
}

.container.style3.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
    border-radius: inherit;
    height: 100%;
    position: absolute;
    width: 100%;
}

.container.style6>.wrapper {
    display: inline-block;
    width: 25rem;
    background-color: transparent;
    border-color: #FFFFFF;
    border-style: solid;
    border-width: 1px;
    border-radius: 3rem;
}

.container.style6>.wrapper>.inner {
    --gutters: 6rem;
    --padding-horizontal: 2rem;
    --padding-vertical: 1rem;
    --spacing: 1.25rem;
    padding: var(--padding-vertical) var(--padding-horizontal);
    border-radius: calc(3rem - 1px);
}

.container.style6.default>.wrapper>.inner>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style6.default>.wrapper>.inner>*:first-child {
    margin-top: 0 !important;
}

.container.style6.default>.wrapper>.inner>*:last-child {
    margin-bottom: 0 !important;
}

.container.style6.columns>.wrapper>.inner {
    flex-wrap: wrap;
    display: flex;
    align-items: flex-start;
}

.container.style6.columns>.wrapper>.inner>* {
    flex-grow: 0;
    flex-shrink: 0;
    max-width: 100%;
    text-align: var(--alignment);
    padding: 0 0 0 var(--gutters);
}

.container.style6.columns>.wrapper>.inner>*>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style6.columns>.wrapper>.inner>*>*:first-child {
    margin-top: 0 !important;
}

.container.style6.columns>.wrapper>.inner>*>*:last-child {
    margin-bottom: 0 !important;
}

.container.style6.columns>.wrapper>.inner>*:first-child {
    margin-left: calc(var(--gutters) * -1);
}

.container.style6.default>.wrapper>.inner>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    max-width: none !important;
    width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
}

.container.style6.default>.wrapper>.inner>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style6.default>.wrapper>.inner>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
}

.container.style6.columns>.wrapper>.inner>div>.full {
    margin-left: calc(var(--gutters) * -0.5);
    max-width: none !important;
    width: calc(100% + var(--gutters) + 0.4725px);
}

.container.style6.columns>.wrapper>.inner>div:first-child>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style6.columns>.wrapper>.inner>div:last-child>.full {
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style6.columns>.wrapper>.inner>div>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
}

.container.style6.columns>.wrapper>.inner>div>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
}

.container.style6.columns>.wrapper>.inner>div:first-child,
.container.style6.columns>.wrapper>.inner>div:first-child>.full:first-child {
    border-top-left-radius: inherit;
}

.container.style6.columns>.wrapper>.inner>div:last-child,
.container.style6.columns>.wrapper>.inner>div:last-child>.full:first-child {
    border-top-right-radius: inherit;
}

.container.style6.columns>.wrapper>.inner>.full {
    align-self: stretch;
}

.container.style6.columns>.wrapper>.inner>.full:first-child {
    border-bottom-left-radius: inherit;
    border-top-left-radius: inherit;
}

.container.style6.columns>.wrapper>.inner>.full:last-child {
    border-bottom-right-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style6.columns>.wrapper>.inner>.full>.full:first-child:last-child {
    border-radius: inherit;
    height: calc(100% + (var(--padding-vertical) * 2));
}

.container.style6.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
    border-radius: inherit;
    height: 100%;
    position: absolute;
    width: 100%;
}

.container.style4 {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: transparent;
}

.container.style4:not(:first-child) {
    margin-top: 2rem !important;
}

.container.style4>.wrapper>.inner {
    --gutters: 6rem;
    --padding-horizontal: 2rem;
    --padding-vertical: 2rem;
    --spacing: 1.25rem;
    padding: var(--padding-vertical) var(--padding-horizontal);
}

.container.style4>.wrapper {
    max-width: var(--width);
    width: 100%;
}

.container.style4.default>.wrapper>.inner>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style4.default>.wrapper>.inner>*:first-child {
    margin-top: 0 !important;
}

.container.style4.default>.wrapper>.inner>*:last-child {
    margin-bottom: 0 !important;
}

.container.style4.columns>.wrapper>.inner {
    flex-wrap: wrap;
    display: flex;
    align-items: flex-start;
}

.container.style4.columns>.wrapper>.inner>* {
    flex-grow: 0;
    flex-shrink: 0;
    max-width: 100%;
    text-align: var(--alignment);
    padding: 0 0 0 var(--gutters);
}

.container.style4.columns>.wrapper>.inner>*>* {
    margin-bottom: var(--spacing);
    margin-top: var(--spacing);
}

.container.style4.columns>.wrapper>.inner>*>*:first-child {
    margin-top: 0 !important;
}

.container.style4.columns>.wrapper>.inner>*>*:last-child {
    margin-bottom: 0 !important;
}

.container.style4.columns>.wrapper>.inner>*:first-child {
    margin-left: calc(var(--gutters) * -1);
}

.container.style4.default>.wrapper>.inner>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    max-width: none !important;
    width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
}

.container.style4.default>.wrapper>.inner>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style4.default>.wrapper>.inner>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
}

.container.style4.columns>.wrapper>.inner>div>.full {
    margin-left: calc(var(--gutters) * -0.5);
    max-width: none !important;
    width: calc(100% + var(--gutters) + 0.4725px);
}

.container.style4.columns>.wrapper>.inner>div:first-child>.full {
    margin-left: calc(var(--padding-horizontal) * -1);
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style4.columns>.wrapper>.inner>div:last-child>.full {
    width: calc(100% + var(--padding-horizontal) + calc(var(--gutters) * 0.5) + 0.4725px);
}

.container.style4.columns>.wrapper>.inner>div>.full:first-child {
    margin-top: calc(var(--padding-vertical) * -1) !important;
}

.container.style4.columns>.wrapper>.inner>div>.full:last-child {
    margin-bottom: calc(var(--padding-vertical) * -1) !important;
}

.container.style4.columns>.wrapper>.inner>div:first-child,
.container.style4.columns>.wrapper>.inner>div:first-child>.full:first-child {
    border-top-left-radius: inherit;
}

.container.style4.columns>.wrapper>.inner>div:last-child,
.container.style4.columns>.wrapper>.inner>div:last-child>.full:first-child {
    border-top-right-radius: inherit;
}

.container.style4.columns>.wrapper>.inner>.full {
    align-self: stretch;
}

.container.style4.columns>.wrapper>.inner>.full:first-child {
    border-bottom-left-radius: inherit;
    border-top-left-radius: inherit;
}

.container.style4.columns>.wrapper>.inner>.full:last-child {
    border-bottom-right-radius: inherit;
    border-top-right-radius: inherit;
}

.container.style4.columns>.wrapper>.inner>.full>.full:first-child:last-child {
    border-radius: inherit;
    height: calc(100% + (var(--padding-vertical) * 2));
}

.container.style4.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
    border-radius: inherit;
    height: 100%;
    position: absolute;
    width: 100%;
}

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





@media (max-width: 1920px) {}

@media (max-width: 1680px) {
    html {
        font-size: 13pt;
    }
}

@media (max-width: 1280px) {
    html {
        font-size: 13pt;
    }
}

@media (max-width: 1024px) {}

@media (max-width: 980px) {
    html {
        font-size: 11pt;
    }
}

@media (max-width: 736px) {
    html {
        font-size: 12pt;
    }

    #main>.inner {
        --padding-horizontal: 1rem;
        --padding-vertical: 3.5rem;
        --spacing: 0rem;
    }

    #main>.inner>*>.full {
        margin-left: calc(-1rem);
        max-width: calc(100% + 2rem + 0.4725px);
        width: calc(100% + 2rem + 0.4725px);
    }

    #main>.inner>*>.full.screen {
        margin-left: -50vw;
    }

    #main>.inner>.active>.full:first-child {
        margin-top: -3.5rem !important;
    }

    #main>.inner>.active>.full:last-child {
        margin-bottom: -3.5rem !important;
    }

    h1.style3,
    h2.style3,
    h3.style3,
    p.style3 {
        letter-spacing: 0.35rem;
        width: calc(100% + 0.35rem);
        font-size: 2em;
        line-height: 1;
    }

    h1.style1,
    h2.style1,
    h3.style1,
    p.style1 {
        letter-spacing: 0.35rem;
        width: calc(100% + 0.35rem);
        font-size: 1.75em;
        line-height: 1.5;
    }

    h1.style2,
    h2.style2,
    h3.style2,
    p.style2 {
        letter-spacing: 0.04375rem;
        width: calc(100% + 0.04375rem);
        font-size: 1em;
        line-height: 1.75;
    }

    h1.style4,
    h2.style4,
    h3.style4,
    p.style4 {
        letter-spacing: 0.196875rem;
        width: calc(100% + 0.196875rem);
        font-size: 1em;
        line-height: 1.5;
    }

    h1.style5,
    h2.style5,
    h3.style5,
    p.style5 {
        letter-spacing: 0.35rem;
        width: calc(100% + 0.35rem);
        font-size: 1.375em;
        line-height: 1.5;
    }

    h1.style6,
    h2.style6,
    h3.style6,
    p.style6 {
        letter-spacing: 0.04375rem;
        width: calc(100% + 0.04375rem);
        font-size: 1em;
        line-height: 1.75;
    }

    h1.style7,
    h2.style7,
    h3.style7,
    p.style7 {
        letter-spacing: 0.04375rem;
        width: calc(100% + 0.04375rem);
        font-size: 1em;
        line-height: 1.75;
    }

    .buttons.style2 {
        gap: 1rem;
    }

    .buttons.style2 li a {
        letter-spacing: 0.1rem;
        padding-left: calc(0.1rem + 0.5rem);
        font-size: 1em;
    }

    .buttons.style1 {
        gap: 0rem;
    }

    .buttons.style1 li a {
        letter-spacing: 0.1rem;
        padding-left: calc(0.1rem + 0.5rem);
        font-size: 1em;
    }

    .buttons.style4 {
        gap: 1rem;
    }

    .buttons.style4 li a {
        letter-spacing: 0.1rem;
        padding-left: calc(0.1rem + 0.5rem);
        font-size: 1em;
    }

    .style3:before {
        width: 16rem;
    }

    .style1:before {
        height: 5rem;
    }

    .style2:before {
        height: 4rem;
    }

    .container.style8>.wrapper>.inner {
        --gutters: 2rem;
        --padding-horizontal: 2rem;
        --padding-vertical: 3.5rem;
        --spacing: 0.75rem;
    }

    .container.style8.columns>.wrapper>.inner {
        flex-direction: column !important;
        flex-wrap: nowrap !important;
    }

    .container.style8.columns>.wrapper>.inner>span {
        height: 0;
        margin-top: calc(var(--gutters) * -1);
        pointer-events: none;
        visibility: hidden;
    }

    .container.style8.columns>.wrapper>.inner>*:first-child {
        margin-left: 0 !important;
        padding-top: 0 !important;
    }

    .container.style8.columns>.wrapper>.inner>* {
        padding: calc(var(--gutters) * 0.5) 0 !important;
    }

    .container.style8.columns>.wrapper>.inner>*:last-child {
        padding-bottom: 0 !important;
    }

    .container.style8.columns>.wrapper>.inner>div>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style8.columns>.wrapper>.inner>div:first-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style8.columns>.wrapper>.inner>div:last-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style8.columns>.wrapper>.inner>div>.full:first-child {
        margin-top: calc(var(--gutters) * -0.5) !important;
    }

    .container.style8.columns>.wrapper>.inner>div>.full:last-child {
        margin-bottom: calc(var(--gutters) * -0.5) !important;
    }

    .container.style8.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        margin-top: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style8.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        margin-bottom: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style8.columns>.wrapper>.inner>div:first-of-type,
    .container.style8.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
    }

    .container.style8.columns>.wrapper>.inner>div:last-of-type,
    .container.style8.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
    }

    .container.style8.columns>.wrapper>.inner>div:first-of-type,
    .container.style8.columns>.wrapper>.inner>div:first-of-type>.full:last-child {
        border-bottom-left-radius: 0 !important;
    }

    .container.style8.columns>.wrapper>.inner>div:last-of-type,
    .container.style8.columns>.wrapper>.inner>div:last-of-type>.full:first-child {
        border-top-right-radius: 0 !important;
    }

    .container.style8.columns>.wrapper>.inner>.full>.full:first-child:last-child {
        height: auto;
    }

    .container.style8.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
        height: auto;
        position: relative;
        width: auto;
    }

    .container.style7>.wrapper>.inner {
        --gutters: 2rem;
        --padding-horizontal: 2rem;
        --padding-vertical: 3.5rem;
        --spacing: 1.5rem;
    }

    .container.style7.columns>.wrapper>.inner {
        flex-direction: column !important;
        flex-wrap: nowrap !important;
    }

    .container.style7.columns>.wrapper>.inner>span {
        height: 0;
        margin-top: calc(var(--gutters) * -1);
        pointer-events: none;
        visibility: hidden;
    }

    .container.style7.columns>.wrapper>.inner>*:first-child {
        margin-left: 0 !important;
        padding-top: 0 !important;
    }

    .container.style7.columns>.wrapper>.inner>* {
        padding: calc(var(--gutters) * 0.5) 0 !important;
    }

    .container.style7.columns>.wrapper>.inner>*:last-child {
        padding-bottom: 0 !important;
    }

    .container.style7.columns>.wrapper>.inner>div>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style7.columns>.wrapper>.inner>div:first-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style7.columns>.wrapper>.inner>div:last-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style7.columns>.wrapper>.inner>div>.full:first-child {
        margin-top: calc(var(--gutters) * -0.5) !important;
    }

    .container.style7.columns>.wrapper>.inner>div>.full:last-child {
        margin-bottom: calc(var(--gutters) * -0.5) !important;
    }

    .container.style7.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        margin-top: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style7.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        margin-bottom: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style7.columns>.wrapper>.inner>div:first-of-type,
    .container.style7.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
    }

    .container.style7.columns>.wrapper>.inner>div:last-of-type,
    .container.style7.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
    }

    .container.style7.columns>.wrapper>.inner>div:first-of-type,
    .container.style7.columns>.wrapper>.inner>div:first-of-type>.full:last-child {
        border-bottom-left-radius: 0 !important;
    }

    .container.style7.columns>.wrapper>.inner>div:last-of-type,
    .container.style7.columns>.wrapper>.inner>div:last-of-type>.full:first-child {
        border-top-right-radius: 0 !important;
    }

    .container.style7.columns>.wrapper>.inner>.full>.full:first-child:last-child {
        height: auto;
    }

    .container.style7.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
        height: auto;
        position: relative;
        width: auto;
    }

    .container.style1 {
        --alignment: center;
        --flex-alignment: center;
        --indent-left: 1;
        --indent-right: 1;
    }

    .container.style1>.wrapper>.inner {
        --gutters: 6rem;
        --padding-horizontal: 2rem;
        --padding-vertical: 3.5rem;
        --spacing: 1.25rem;
    }

    .container.style1.columns>.wrapper>.inner {
        flex-direction: column !important;
        flex-wrap: nowrap !important;
    }

    .container.style1.columns>.wrapper>.inner>span {
        height: 0;
        margin-top: calc(var(--gutters) * -1);
        pointer-events: none;
        visibility: hidden;
    }

    .container.style1.columns>.wrapper>.inner>*:first-child {
        margin-left: 0 !important;
        padding-top: 0 !important;
    }

    .container.style1.columns>.wrapper>.inner>* {
        padding: calc(var(--gutters) * 0.5) 0 !important;
    }

    .container.style1.columns>.wrapper>.inner>*:last-child {
        padding-bottom: 0 !important;
    }

    .container.style1.columns>.wrapper>.inner>div>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style1.columns>.wrapper>.inner>div:first-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style1.columns>.wrapper>.inner>div:last-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style1.columns>.wrapper>.inner>div>.full:first-child {
        margin-top: calc(var(--gutters) * -0.5) !important;
    }

    .container.style1.columns>.wrapper>.inner>div>.full:last-child {
        margin-bottom: calc(var(--gutters) * -0.5) !important;
    }

    .container.style1.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        margin-top: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style1.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        margin-bottom: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style1.columns>.wrapper>.inner>div:first-of-type,
    .container.style1.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
    }

    .container.style1.columns>.wrapper>.inner>div:last-of-type,
    .container.style1.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
    }

    .container.style1.columns>.wrapper>.inner>div:first-of-type,
    .container.style1.columns>.wrapper>.inner>div:first-of-type>.full:last-child {
        border-bottom-left-radius: 0 !important;
    }

    .container.style1.columns>.wrapper>.inner>div:last-of-type,
    .container.style1.columns>.wrapper>.inner>div:last-of-type>.full:first-child {
        border-top-right-radius: 0 !important;
    }

    .container.style1.columns>.wrapper>.inner>.full>.full:first-child:last-child {
        height: auto;
    }

    .container.style1.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
        height: auto;
        position: relative;
        width: auto;
    }

    #container04>.wrapper>.inner> :nth-child(1) {
        --alignment: center;
        --flex-alignment: center;
        --indent-left: 1;
        --indent-right: 1;
        min-height: 100% !important;
        width: 100% !important;
    }

    #container04>.wrapper>.inner> :nth-child(2) {
        --alignment: center;
        --flex-alignment: center;
        --indent-left: 1;
        --indent-right: 1;
        min-height: 100% !important;
        width: 100% !important;
    }

    .container.style5 {
        --alignment: center;
        --flex-alignment: center;
        --indent-left: 1;
        --indent-right: 1;
    }

    .container.style5>.wrapper>.inner {
        --gutters: 6rem;
        --padding-horizontal: 2rem;
        --padding-vertical: 3.5rem;
        --spacing: 1.25rem;
    }

    .container.style5.columns>.wrapper>.inner {
        flex-direction: column-reverse !important;
        flex-wrap: nowrap !important;
    }

    .container.style5.columns>.wrapper>.inner>span {
        height: 0;
        margin-top: calc(var(--padding-vertical) * -2);
        pointer-events: none;
        visibility: hidden;
    }

    .container.style5.columns>.wrapper>.inner>*:first-child {
        margin-left: 0 !important;
        padding-bottom: 0 !important;
    }

    .container.style5.columns>.wrapper>.inner>* {
        padding: calc(var(--gutters) * 0.5) 0 !important;
    }

    .container.style5.columns>.wrapper>.inner>*:last-child {
        padding-top: 0 !important;
    }

    .container.style5.columns>.wrapper>.inner>div>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style5.columns>.wrapper>.inner>div:first-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style5.columns>.wrapper>.inner>div:last-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style5.columns>.wrapper>.inner>div>.full:first-child {
        margin-top: calc(var(--gutters) * -0.5) !important;
    }

    .container.style5.columns>.wrapper>.inner>div>.full:last-child {
        margin-bottom: calc(var(--gutters) * -0.5) !important;
    }

    .container.style5.columns>.wrapper>.inner>div:last-of-type>.full:first-child {
        margin-top: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style5.columns>.wrapper>.inner>div:first-of-type>.full:last-child {
        margin-bottom: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style5.columns>.wrapper>.inner>div:last-of-type,
    .container.style5.columns>.wrapper>.inner>div:last-of-type>.full:first-child {
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
    }

    .container.style5.columns>.wrapper>.inner>div:first-of-type,
    .container.style5.columns>.wrapper>.inner>div:first-of-type>.full:last-child {
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
    }

    .container.style5.columns>.wrapper>.inner>div:last-of-type,
    .container.style5.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        border-bottom-right-radius: 0 !important;
    }

    .container.style5.columns>.wrapper>.inner>div:first-of-type,
    .container.style5.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        border-top-left-radius: 0 !important;
    }

    .container.style5.columns>.wrapper>.inner>.full>.full:first-child:last-child {
        height: auto;
    }

    .container.style5.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
        height: auto;
        position: relative;
        width: auto;
    }

    #container03>.wrapper>.inner> :nth-child(1) {
        --alignment: center;
        --flex-alignment: center;
        --indent-left: 1;
        --indent-right: 1;
        min-height: 100% !important;
        width: 100% !important;
    }

    #container03>.wrapper>.inner> :nth-child(2) {
        --alignment: center;
        --flex-alignment: center;
        --indent-left: 1;
        --indent-right: 1;
        min-height: 100% !important;
        width: 100% !important;
    }

    .container.style2>.wrapper>.inner {
        --gutters: 6rem;
        --padding-horizontal: 2rem;
        --padding-vertical: 3rem;
        --spacing: 1.25rem;
    }

    .container.style2.columns>.wrapper>.inner {
        flex-direction: column !important;
        flex-wrap: nowrap !important;
    }

    .container.style2.columns>.wrapper>.inner>span {
        height: 0;
        margin-top: calc(var(--gutters) * -1);
        pointer-events: none;
        visibility: hidden;
    }

    .container.style2.columns>.wrapper>.inner>*:first-child {
        margin-left: 0 !important;
        padding-top: 0 !important;
    }

    .container.style2.columns>.wrapper>.inner>* {
        padding: calc(var(--gutters) * 0.5) 0 !important;
    }

    .container.style2.columns>.wrapper>.inner>*:last-child {
        padding-bottom: 0 !important;
    }

    .container.style2.columns>.wrapper>.inner>div>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style2.columns>.wrapper>.inner>div:first-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style2.columns>.wrapper>.inner>div:last-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style2.columns>.wrapper>.inner>div>.full:first-child {
        margin-top: calc(var(--gutters) * -0.5) !important;
    }

    .container.style2.columns>.wrapper>.inner>div>.full:last-child {
        margin-bottom: calc(var(--gutters) * -0.5) !important;
    }

    .container.style2.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        margin-top: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style2.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        margin-bottom: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style2.columns>.wrapper>.inner>div:first-of-type,
    .container.style2.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
    }

    .container.style2.columns>.wrapper>.inner>div:last-of-type,
    .container.style2.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
    }

    .container.style2.columns>.wrapper>.inner>div:first-of-type,
    .container.style2.columns>.wrapper>.inner>div:first-of-type>.full:last-child {
        border-bottom-left-radius: 0 !important;
    }

    .container.style2.columns>.wrapper>.inner>div:last-of-type,
    .container.style2.columns>.wrapper>.inner>div:last-of-type>.full:first-child {
        border-top-right-radius: 0 !important;
    }

    .container.style2.columns>.wrapper>.inner>.full>.full:first-child:last-child {
        height: auto;
    }

    .container.style2.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
        height: auto;
        position: relative;
        width: auto;
    }

    .container.style3>.wrapper>.inner {
        --gutters: 6rem;
        --padding-horizontal: 2rem;
        --padding-vertical: 3.5rem;
        --spacing: 1.25rem;
    }

    .container.style3.columns>.wrapper>.inner {
        flex-direction: column !important;
        flex-wrap: nowrap !important;
    }

    .container.style3.columns>.wrapper>.inner>span {
        height: 0;
        margin-top: calc(var(--gutters) * -1);
        pointer-events: none;
        visibility: hidden;
    }

    .container.style3.columns>.wrapper>.inner>*:first-child {
        margin-left: 0 !important;
        padding-top: 0 !important;
    }

    .container.style3.columns>.wrapper>.inner>* {
        padding: calc(var(--gutters) * 0.5) 0 !important;
    }

    .container.style3.columns>.wrapper>.inner>*:last-child {
        padding-bottom: 0 !important;
    }

    .container.style3.columns>.wrapper>.inner>div>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style3.columns>.wrapper>.inner>div:first-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style3.columns>.wrapper>.inner>div:last-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style3.columns>.wrapper>.inner>div>.full:first-child {
        margin-top: calc(var(--gutters) * -0.5) !important;
    }

    .container.style3.columns>.wrapper>.inner>div>.full:last-child {
        margin-bottom: calc(var(--gutters) * -0.5) !important;
    }

    .container.style3.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        margin-top: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style3.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        margin-bottom: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style3.columns>.wrapper>.inner>div:first-of-type,
    .container.style3.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
    }

    .container.style3.columns>.wrapper>.inner>div:last-of-type,
    .container.style3.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
    }

    .container.style3.columns>.wrapper>.inner>div:first-of-type,
    .container.style3.columns>.wrapper>.inner>div:first-of-type>.full:last-child {
        border-bottom-left-radius: 0 !important;
    }

    .container.style3.columns>.wrapper>.inner>div:last-of-type,
    .container.style3.columns>.wrapper>.inner>div:last-of-type>.full:first-child {
        border-top-right-radius: 0 !important;
    }

    .container.style3.columns>.wrapper>.inner>.full>.full:first-child:last-child {
        height: auto;
    }

    .container.style3.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
        height: auto;
        position: relative;
        width: auto;
    }

    .container.style6>.wrapper>.inner {
        --gutters: 6rem;
        --padding-horizontal: 2rem;
        --padding-vertical: 1rem;
        --spacing: 1.25rem;
    }

    .container.style6.columns>.wrapper>.inner {
        flex-direction: column !important;
        flex-wrap: nowrap !important;
    }

    .container.style6.columns>.wrapper>.inner>span {
        height: 0;
        margin-top: calc(var(--gutters) * -1);
        pointer-events: none;
        visibility: hidden;
    }

    .container.style6.columns>.wrapper>.inner>*:first-child {
        margin-left: 0 !important;
        padding-top: 0 !important;
    }

    .container.style6.columns>.wrapper>.inner>* {
        padding: calc(var(--gutters) * 0.5) 0 !important;
    }

    .container.style6.columns>.wrapper>.inner>*:last-child {
        padding-bottom: 0 !important;
    }

    .container.style6.columns>.wrapper>.inner>div>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style6.columns>.wrapper>.inner>div:first-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style6.columns>.wrapper>.inner>div:last-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style6.columns>.wrapper>.inner>div>.full:first-child {
        margin-top: calc(var(--gutters) * -0.5) !important;
    }

    .container.style6.columns>.wrapper>.inner>div>.full:last-child {
        margin-bottom: calc(var(--gutters) * -0.5) !important;
    }

    .container.style6.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        margin-top: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style6.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        margin-bottom: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style6.columns>.wrapper>.inner>div:first-of-type,
    .container.style6.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
    }

    .container.style6.columns>.wrapper>.inner>div:last-of-type,
    .container.style6.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
    }

    .container.style6.columns>.wrapper>.inner>div:first-of-type,
    .container.style6.columns>.wrapper>.inner>div:first-of-type>.full:last-child {
        border-bottom-left-radius: 0 !important;
    }

    .container.style6.columns>.wrapper>.inner>div:last-of-type,
    .container.style6.columns>.wrapper>.inner>div:last-of-type>.full:first-child {
        border-top-right-radius: 0 !important;
    }

    .container.style6.columns>.wrapper>.inner>.full>.full:first-child:last-child {
        height: auto;
    }

    .container.style6.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
        height: auto;
        position: relative;
        width: auto;
    }

    .container.style4:not(:first-child) {
        margin-top: 1.5rem !important;
    }

    .container.style4>.wrapper>.inner {
        --gutters: 6rem;
        --padding-horizontal: 2rem;
        --padding-vertical: 2rem;
        --spacing: 1.25rem;
    }

    .container.style4.columns>.wrapper>.inner {
        flex-direction: column !important;
        flex-wrap: nowrap !important;
    }

    .container.style4.columns>.wrapper>.inner>span {
        height: 0;
        margin-top: calc(var(--gutters) * -1);
        pointer-events: none;
        visibility: hidden;
    }

    .container.style4.columns>.wrapper>.inner>*:first-child {
        margin-left: 0 !important;
        padding-top: 0 !important;
    }

    .container.style4.columns>.wrapper>.inner>* {
        padding: calc(var(--gutters) * 0.5) 0 !important;
    }

    .container.style4.columns>.wrapper>.inner>*:last-child {
        padding-bottom: 0 !important;
    }

    .container.style4.columns>.wrapper>.inner>div>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style4.columns>.wrapper>.inner>div:first-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style4.columns>.wrapper>.inner>div:last-of-type>.full {
        margin-left: calc(var(--padding-horizontal) * -1);
        width: calc(100% + (var(--padding-horizontal) * 2) + 0.4725px);
    }

    .container.style4.columns>.wrapper>.inner>div>.full:first-child {
        margin-top: calc(var(--gutters) * -0.5) !important;
    }

    .container.style4.columns>.wrapper>.inner>div>.full:last-child {
        margin-bottom: calc(var(--gutters) * -0.5) !important;
    }

    .container.style4.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        margin-top: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style4.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        margin-bottom: calc(var(--padding-vertical) * -1) !important;
    }

    .container.style4.columns>.wrapper>.inner>div:first-of-type,
    .container.style4.columns>.wrapper>.inner>div:first-of-type>.full:first-child {
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
    }

    .container.style4.columns>.wrapper>.inner>div:last-of-type,
    .container.style4.columns>.wrapper>.inner>div:last-of-type>.full:last-child {
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
    }

    .container.style4.columns>.wrapper>.inner>div:first-of-type,
    .container.style4.columns>.wrapper>.inner>div:first-of-type>.full:last-child {
        border-bottom-left-radius: 0 !important;
    }

    .container.style4.columns>.wrapper>.inner>div:last-of-type,
    .container.style4.columns>.wrapper>.inner>div:last-of-type>.full:first-child {
        border-top-right-radius: 0 !important;
    }

    .container.style4.columns>.wrapper>.inner>.full>.full:first-child:last-child {
        height: auto;
    }

    .container.style4.columns>.wrapper>.inner>.full>.full:first-child:last-child>* {
        height: auto;
        position: relative;
        width: auto;
    }


    .icons.style1 {
        font-size: 1.875em;
        gap: 1rem;
    }

    form.style1:not(:first-child) {
        margin-top: 1.875rem !important;
    }

    form.style1:not(:last-child) {
        margin-bottom: 1.875rem !important;
    }

    form.style1 label:first-child {
        font-size: 1em;
        line-height: 1.5;

        padding-left: 0.325rem;
    }

    form.style1 input[type="text"],
    form.style1 input[type="password"],
    form.style1 input[type="email"],
    form.style1 input[type="tel"],
    form.style1 input[type="number"],
    form.style1 textarea,
    form.style1 select,
    form.style1 .file,
    form.style1 .date {
        font-size: 1em;
        padding-left: calc(0.05rem + 1.1375rem);
    }

    form.style1 textarea {
        line-height: 1.5;
        padding-top: 0.875rem;
    }

    form.style1 input[type="checkbox"]+label,
    form.style1 p {
        font-size: 1em;
        line-height: 1.5;
        padding-left: 0.05rem;
    }

    form.style1 .actions button {
        font-size: 1em;
        padding-left: calc(0.1rem + 0.5rem);
    }
}

@media (max-width: 480px) {
    #main>.inner {
        --spacing: 0rem;
    }

    .buttons.style2 li a {
        width: 18rem;
    }

    .buttons.style1 li a {
        width: 18rem;
    }

    .buttons.style4 li a {
        width: 8.875rem;
    }

    .container.style8>.wrapper>.inner {
        --spacing: 0.65625rem;
    }

    .container.style7>.wrapper>.inner {
        --spacing: 1.3125rem;
    }

    .container.style1>.wrapper>.inner {
        --spacing: 1.09375rem;
    }

    .container.style5>.wrapper>.inner {
        --spacing: 1.09375rem;
    }

    .container.style2>.wrapper>.inner {
        --spacing: 1.09375rem;
    }

    .container.style3>.wrapper>.inner {
        --spacing: 1.09375rem;
    }

    .container.style6>.wrapper>.inner {
        --spacing: 1.09375rem;
    }

    .container.style4>.wrapper>.inner {
        --spacing: 1.09375rem;
    }

    .image.style1 .frame {
        height: 16rem !important;
    }

    form.style1 .actions button {
        max-width: 32rem;
        width: 100%;
    }
}

@media (max-width: 360px) {
    #main>.inner {
        --padding-horizontal: 0.75rem;
        --padding-vertical: 2.625rem;
        --spacing: 0rem;
    }

    #main>.inner>*>.full {
        margin-left: calc(-0.75rem);
        max-width: calc(100% + 1.5rem + 0.4725px);
        width: calc(100% + 1.5rem + 0.4725px);
    }

    #main>.inner>*>.full.screen {
        margin-left: -50vw;
    }

    #main>.inner>.active>.full:first-child {
        margin-top: -2.625rem !important;
    }

    #main>.inner>.active>.full:last-child {
        margin-bottom: -2.625rem !important;
    }

    h1.style3,
    h2.style3,
    h3.style3,
    p.style3 {
        font-size: 1.5em;
    }

    h1.style1,
    h2.style1,
    h3.style1,
    p.style1 {
        font-size: 1.5em;
    }


    h1.style5,
    h2.style5,
    h3.style5,
    p.style5 {
        font-size: 1.375em;
    }


    .container.style1>.wrapper>.inner {
        --gutters: 4.5rem;
        --padding-horizontal: 1.5rem;
        --padding-vertical: 2.625rem;
        --spacing: 0.9375rem;
    }


}
</style>