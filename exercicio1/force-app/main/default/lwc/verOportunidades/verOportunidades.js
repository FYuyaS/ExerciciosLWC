import { LightningElement, api, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';


export default class VerOportunidades extends LightningElement {
    @api recordId;
    records = [];
    error;

    columns = [
        { label: 'Name',       fieldName: 'Name' },
        { label: 'Stage',      fieldName: 'StageName' },
        { label: 'Amount',     fieldName: 'Amount',   type: 'currency' },
    ];

    @wire(getRelatedListRecords, {
    parentRecordId: '$recordId',
    relatedListId: 'Opportunities',
    fields: ['Opportunity.Id','Opportunity.Name','Opportunity.Amount','Opportunity.StageName'],
    sortBy: ['Opportunity.Name']
    })
    listOpportunities({ error, data }){
        if (data) {
            this.records = data.records.map(record => {
                const flatRecord = { Id: record.id };
                Object.keys(record.fields).forEach(fieldName => {
                    flatRecord[fieldName] = record.fields[fieldName].value;
                });
                return flatRecord;
            });
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.records = [];
    }
    }
}