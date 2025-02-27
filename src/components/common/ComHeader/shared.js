// this function are needed to toggle classes in classLists and arrays

function toggleDOMTokenListItem(classList,classListItem){
    if (classList.contains(classListItem)){
        classList.remove(classListItem);
    } else{
        classList.add(classListItem)
    }
}

function toggleArrayItem(classList, classListItem){
    if(classList.find(el => el == classListItem)){
        classList = classList.filter(el => el!=classListItem);
    } else {
        classList.push(classListItem);
    }

    return classList
}

export {toggleDOMTokenListItem, toggleArrayItem}