import { defineType, defineField, defineArrayMember } from "sanity"
export const post = defineType( {
    name:'post',
    type:'document',
    title:'Post',
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
        defineField({
            name:'image',
            type:'image',
            title:'Image'
        }),

        // {
        //     name:'gender',
        //     type:'string',
        //     title:'Gender',
        //     options:{
        //         list:[
        //          {title:'Male',value:'male'},
        //          {title:'Female',value:'female'}
        //         ],
        //         layout:'radio'
        //     }
        // }

    ]

})