export function findAndRemoveFromList(list, element) {
    var index = list.indexOf(element);
    if (index > -1) {
        list.splice(index, 1);
    } else {
        console.log("Element not found");
    }
}