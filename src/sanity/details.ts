import { defineType, defineField, defineArrayMember } from "sanity"
export const details = defineType( {
    name:'details',
    type:'document',
    title:'Details',
    fields:[
        defineField({
        name:'title',
        type:'string',
        title:'Post Title',
        description:'Title Of The Post',
        validation: Rule => Rule.required()
        }),

        //slug field 
        defineField({
            name:'slug',
            type:'slug',
            title:'Slug',
            options:{
                source:'title',
                maxLength:96,
            },
            validation: Rule => Rule.required()
        }),
    ]

})