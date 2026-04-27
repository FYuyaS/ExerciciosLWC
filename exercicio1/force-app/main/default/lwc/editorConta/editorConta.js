import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class EditorConta extends LightningElement {
    @api recordId;

    handleSuccess(event){
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Sucesso',
                message: 'Conta atualizada com sucesso',
                variant: 'success'
            })
        );
    }

    handleError(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Erro ao salvar',
                message: event.detail.message,
                variant: 'error'
            })
        );
    }

}