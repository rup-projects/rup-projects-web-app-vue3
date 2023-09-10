import type { App } from 'vue'
import AppLink from "../components/AppLink.vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Card from 'primevue/card';
import Tag from 'primevue/tag';
import InputNumber from 'primevue/inputnumber';
import Calendar from 'primevue/calendar';


export default function registerGlobalComponents (app: App): void {
  app.component('AppLink', AppLink)
  app.component("Dialog", Dialog)
  app.component("Button", Button)
  app.component('DataTable', DataTable);
  app.component('Column', Column);
  app.component('Card', Card);
  app.component('Tag', Tag);
  app.component('InputNumber', InputNumber);
  app.component('Calendar', Calendar);

}
