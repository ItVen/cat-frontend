
enum Color{
    offline = 'primary',
    online = 'info',
    error = 'negative',
}
enum Show{
    occupyHide = 'invisible',
    notOccupyHide = 'hidden',
    show = ''
}

enum Icon{
    online = 'ion-radio-button-on',
    offline = 'ion-radio-button-off',
    loginSuccess = 'ion-checkmark-circle-outline',
    loginFiale = 'ion-close-circle-outline'
}
interface Data {
    text: string,
    iconLeft: string,
    color: string,
    showProgress: string,
    showLoginState: string,
    iconRight: string
}

function getOnlineStateIcon(value: number, state: boolean):string{
    if(value>0) if(state) return Icon.online
    return Icon.offline;
}

function getLoginStateIcon(state: boolean):string{
    if(state) return Icon.loginSuccess
    return Icon.loginFiale;
}


function getLoginStateColor(value: number, state: boolean):string{
     if(value>=100) {
         if(state) return Color.online
         return Color.error
     }
    return Color.offline;
}

function getProgressOccupyState(value: number):string{
     if(value>=100) return Show.notOccupyHide
     if(value>0) return Show.show
    return Show.occupyHide;
}

function geIconRightOccupyState(value: number):string{
     if(value<100) return Show.notOccupyHide
     return Show.show
}
function getContext(context: string):string{
     const splitText: string[] = context.split('@');
     let text = splitText[0].substr(0, 4);
     if (splitText[1]) {
        text = text + '...@' + splitText[1];
        return text
     }
     return context;
}

export function getStateData(value: number, state: boolean,context: string): Data{

    return {
        text:getContext(context),
        iconLeft: getOnlineStateIcon(value, state),
        color: getLoginStateColor(value, state),
        showProgress: getProgressOccupyState(value),
        showLoginState: geIconRightOccupyState(value),
        iconRight: getLoginStateIcon(state)
    }
}
