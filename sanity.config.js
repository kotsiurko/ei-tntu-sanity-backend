import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
//import {googleMapsInput} from '@sanity/google-maps-input'
import { schemaTypes } from './schemas'

import { media } from 'sanity-plugin-media'

export default defineConfig({
  name: 'default',
  title: 'tntu-sanity',

  projectId: 'asnyakur',
  dataset: 'production',

  plugins: [
    deskTool(),
    visionTool(),
    //googleMapsInput(),
    media(),
    {
      "name": "desk-structure",
      "path": "./deskStructure.js"
    }
  ],

  schema: {
    types: schemaTypes,
  },
})
