/*
* 包含n个工具函数
* */

export function getRedirectTo(type,header) {
    let path
    if(type === 'laoban'){
        path = '/laoban'
    }else{
        path = '/dashen'
    }

    if(!header){
        path += 'Info'
    }

    return path
}