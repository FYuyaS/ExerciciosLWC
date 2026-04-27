import { LightningElement, api, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';


export default class VerOportunidades extends LightningElement {
    @api recordId;
    records = [];
    error;


    @wire(getRelatedListRecords, {
    parentRecordId: '$recordId',
    relatedListId: 'Opportunities',
    fields: ['Opportunity.Id','Opportunity.Name','Opportunity.Amount','Opportunity.StageName'],
    sortBy: ['Opportunity.Name']
    })
    listOpportunities({ error, data }){
        if (data) {
            this.records = data.records.map(record => ({
                Id: record.id,
                Name: record.fields.Name.value,
                Amount: record.fields.Amount.value,
                StageName: record.fields.StageName.value
            }));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.records = [];
    }
    }
}