import { Injectable } from '@angular/core';
import { Ng2IzitoastService } from 'ng2-izitoast';

@Injectable()
export class ToastHelper {

    constructor(public iziToast: Ng2IzitoastService) { }

    public toast(data: IToast) {
        let color = '#efefef';
        color = (data.type === 'success') ? '#d6fdca' : color;
        color = (data.type === 'error') ? '#ffbfbc' : color;

        data.icon = (data.icon === 'error') ? 'exclamation-triangle' : data.icon;
        this.iziToast.show({
            timeout: (data.time) ? data.time : 5000,
            progressBar: true,
            backgroundColor: color,
            progressBarEasing: 'linear',
            icon: 'fa fa-2x fa-' + data.icon,
            position: 'bottomRight',
            transitionOut: 'fadeOutUp',
            transitionIn: 'bounceInLeft',
            title: data.title,
            pauseOnHover: true,
            message: data.message
        });
    }
}
