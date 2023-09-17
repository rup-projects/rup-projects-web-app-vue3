import type { App } from 'vue'
import AppLink from "../components/AppLink.vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Card from 'primevue/card';
import Tag from 'primevue/tag';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';



export default function registerGlobalComponents (app: App): void {
  app.component('AppLink', AppLink)
  app.component("Dialog", Dialog)
  app.component("Button", Button)
  app.component('DataTable', DataTable);
  app.component('Column', Column);
  app.component('Card', Card);
  app.component('Tag', Tag);
  app.component('InputNumber', InputNumber);
  app.component('InputText', InputText);
  app.component('Calendar', Calendar);
  app.component('Dropdown', Dropdown);

}
