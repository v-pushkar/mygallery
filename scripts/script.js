import classesGalleryBox from '/scripts/modules/galleryClasses.js';
import animationClass from '/scripts/modules/animationClass.js';
import itemBoxSize from '/scripts/modules/itemSize.js';
import itemBorder from '/scripts/modules/itemBorder.js';
import oneRow from '/scripts/modules/oneRow.js';
import itemsWrapper from '/scripts/modules/itemsWrapper.js';

// options for view gallery 
const g_options = {
    hover_animation: "scale", // - animation for hover-efect 
    structure: "table", // "oneRow", "table"
    struct_cols: "14-4-4-2", // from 1 - 12, "default" - numbers of items in one row foe diferent screens (fron big screens to mobile). If "default" - 8, 6, 3, 2.
    trackBox_teg: "div",
    item_wrappteg: "div",
    item_order: "equally", // "mix" "equally"
    item_margin: 0, // "no" - parameter for margins bettwen items
    item_form: "square", // "rectangle", "circle", "square" - parameter for item form
    item_border: "none"
    // item_border: [{
    //     color: "#777777",
    //     windth: 10, // just number
    //     radius: 20, // just number
    // }],
};

document.onload = createGallery(g_options);

itemBorder(g_options.item_border);

function createGallery(a) {
    // a - array with psrameters for slider:
    var galleryBox = document.querySelector('[data-name="gallery-box"]'); // get main box with items
    let galleryWidth = galleryBox.offsetWidth;
    console.log("gallert width :"+galleryWidth)
    galleryBox.setAttribute('class', `gallery-box ${classesGalleryBox(a)}`); // add class to main box
    // let gallitems = galleryBox.getElementsByTagName('*'); // select ol child/items 
    let gallitems = galleryBox.children; // select oll child/items 
    galleryBox.appendChild(itemsWrapper(gallitems, g_options, galleryWidth));
    animationCorrect(gallitems, a.structure, galleryWidth);
};

function animationCorrect(el, b, w) { // el - arrey items of gallery, b -  type of gallery structure, w - width of gallery box
    let xx = document.getElementsByClassName("item-Wrapp");
    let rowWidth = 0;
    for (let i = 0; i < xx.length; ++i) {
        let ofsetElLeft = xx[i].offsetLeft;
        // console.log(`ofsetleft of item : ${ofsetElLeft}`)
        // let windWidth = window.innerWidth;
        let docWidth = window.innerWidth;
        let windWidth = w;
        let elWidth = xx[i].offsetWidth;
        rowWidth = rowWidth + elWidth;
        // console.log(`distans of items : ${(elWidth + ofsetElLeft + (docWidth - windWidth)*0.5 )} ; ${(docWidth - (docWidth - windWidth)*0.5  - elWidth / 3)}`)
        if (ofsetElLeft < (xx[i].offsetWidth / 3)) {
            xx[i].classList.add("transl-to-right")
        // } else if (((elWidth + ofsetElLeft) <= innerWidth) && ((elWidth + ofsetElLeft) > (innerWidth - elWidth / 3))) {
        } else if ((elWidth + ofsetElLeft + (docWidth - windWidth)*0.5 ) > (docWidth - (docWidth - windWidth)*0.5  - elWidth / 3)) {
            xx[i].classList.add(`transl-to-left`);
            
        }
    }
    if (b.structure == "oneRow") {
        oneRow(rowWidth);
    }
};