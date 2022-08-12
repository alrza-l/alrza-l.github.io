

function alertmessage(msg) {
    ShowMessage(msg, 4)
}

function ShowMessage(text, type, layout, timeout, maxVisible, dismissQueue) {
    if (!text) return;

    if (type === undefined) {
        type = 'error';
    }
    if (timeout === undefined) {
        timeout = 50000;
    }
    if (maxVisible === undefined) {
        maxVisible = 10;
    }
    if (dismissQueue === undefined) {
        dismissQueue = true;
    }
    
    switch (type)
    {
        case 0:
            type = 'alert';
            break;
        case 1:
            type = 'information';
             break;
        case 2:
            type = 'error';
            break;
        case 3: type = 'warning';
            break;
        case 4: type = 'notification';
            break;
        case 5: type = 'success';
            break;

    }
    if (layout === undefined) {
        layout = 'top';
    }
    var n = noty({
        text: text,
        type: type,
        dismissQueue: dismissQueue,
        timeout: timeout,
        layout: layout,
        theme: 'relax',
        maxVisible: maxVisible
    });
    console.log('html: ' + n.options.id);
}