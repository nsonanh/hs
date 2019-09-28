<template>
      <div class="col-12">
        <card class="card-plain">
          <div class="table-full-width table-responsive">
            <paper-table type="hover" :title="table2.title" :sub-title="table2.subTitle" :data="table2.data"
                         :columns="table2.columns">

            </paper-table>
          </div>
        </card>
        <div class="text-center">
          <p-button type="success"
            size='lg'
            @click.native.prevent="updateProfile">
            Tạo mới
          </p-button>
        </div>
      </div>
</template>
<script>
import { PaperTable } from "@/components";
const tableColumns = ["Id", "Name", "Salary", "Country", "City"];
const tableData = [
  {
    id: 1,
    name: "Dakota Rice",
    salary: "$36.738",
    country: "Niger",
    city: "Oud-Turnhout"
  },
  {
    id: 2,
    name: "Minerva Hooper",
    salary: "$23,789",
    country: "Curaçao",
    city: "Sinaai-Waas"
  },
  {
    id: 3,
    name: "Sage Rodriguez",
    salary: "$56,142",
    country: "Netherlands",
    city: "Baileux"
  },
  {
    id: 4,
    name: "Philip Chaney",
    salary: "$38,735",
    country: "Korea, South",
    city: "Overland Park"
  },
  {
    id: 5,
    name: "Doris Greene",
    salary: "$63,542",
    country: "Malawi",
    city: "Feldkirchen in Kärnten"
  },
  {
    id: 6,
    name: "Doris Greene",
    salary: "$63,542",
    country: "Malawi",
    city: "Feldkirchen in Kärnten"
  },
  {
    id: 7,
    name: "Doris Greene",
    salary: "$63,542",
    country: "Malawi",
    city: "Feldkirchen in Kärnten"
  },
  {
    id: 8,
    name: "Doris Greene",
    salary: "$63,542",
    country: "Malawi",
    city: "Feldkirchen in Kärnten"
  },
  {
    id: 9,
    name: "Doris Greene",
    salary: "$63,542",
    country: "Malawi",
    city: "Feldkirchen in Kärnten"
  },
  {
    id: 10,
    name: "Doris Greene",
    salary: "$63,542",
    country: "Malawi",
    city: "Feldkirchen in Kärnten"
  }
];

export default {
  components: {
    PaperTable
  },
  data() {
    return {
      table1: {
        title: "Stripped Table",
        subTitle: "Here is a subtitle for this table",
        columns: [...tableColumns],
        data: [...tableData]
      },
      table2: {
        title: "Table on Plain Background",
        subTitle: "Here is a subtitle for this table",
        columns: [...tableColumns],
        data: [...tableData]
      }
    };
  }
};
</script>