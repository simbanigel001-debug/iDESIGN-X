/* Edging Rules Engine
   calculateEdging(componentType, length, shortDim)
   Returns a normalized string describing edging requirements per manufacturing rules.
*/
function calculateEdging(componentType, length, shortDim){
    if(!componentType) return 'None';
    const name = componentType.toLowerCase();

    // Uprights: Side Panel / Upright
    if(name.includes('side') || name.includes('upright')){
        return '2 short, 1 long';
    }

    // Shelves
    if(name.includes('shelf')){
        return '1 length area';
    }

    // Drawer bottoms
    if(name.includes('bottom')){
        return 'None';
    }

    // Backs
    if(name.includes('back')){
        return '2 shorts';
    }

    // Doors
    if(name.includes('door')){
        return 'All around';
    }

    // Drawer faces / fronts
    if(name.includes('face') || (name.includes('drawer') && name.includes('front'))){
        return 'All around';
    }

    // Drawers in general
    if(name.includes('drawer')){
        // if length equals 450 (exact) treat as 450 drawer
        if(Math.round(Number(length) || 0) === 450){
            return '1 long, 2 short';
        }
        return '1 long';
    }

    // Default fallback
    return '1 long';
}

console.log('Edging rules loaded');