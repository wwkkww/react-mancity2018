
export const FirebaseLooper = (snapshot) => {
    let data = [];
    snapshot.forEach((child)=> {
        data.push({
            ...child.val(), 
            id: child.key
        })
    })
    return data;
};

export const reverseArray = (actualArray) => {
    let tmpArray = [];

    for (let i= actualArray.length-1 ; i>=0 ; i--) {
        tmpArray.push(actualArray[i])
    };
    
    return tmpArray;
};
