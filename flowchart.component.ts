import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.scss']
})
export class FlowchartComponent implements OnInit {

  constructor() { }

  public flowchartParent = [
    {
      children: [
        {
          content: "ORDER_CANCEL",
          class: "content disable",
        }
      ],
      arrow: true,
      rightArrow: "right-arrow active",
      leftArrow: "left-arrow active"
    },
    {
      children: [
        {
          content: "ORDER_DONE",
          class: "content active",
        }
      ],
      arrow: true,
      rightArrow: "right-arrow active",
      leftArrow: "left-arrow active"
    },
    {
      children: [
        {
          content: "EXECUTED_DONE",
          class: "content select"
        },
        {
          content: "EXECUTED_NOT_ACCEPTABLE",
          class: "content disable"
        }
      ]
    }
  ]

  ngOnInit(): void {
  }

  public flowchartMap = {
    ORDER_CANCEL: {
      ORDER_CANCEL: "content select",
      ORDER_DONE: "content active",
      EXECUTED_DONE: "content disable",
      EXECUTED_NOT_ACCEPTABLE: "content disable"
    },
    ORDER_DONE: {
      ORDER_CANCEL: "content active",
      ORDER_DONE: "content select",
      EXECUTED_DONE: "content active",
      EXECUTED_NOT_ACCEPTABLE: "content active"
    },
    EXECUTED_DONE: {
      ORDER_CANCEL: "content disable",
      ORDER_DONE: "content active",
      EXECUTED_DONE: "content select",
      EXECUTED_NOT_ACCEPTABLE: "content disable"
    },
    EXECUTED_NOT_ACCEPTABLE: {
      ORDER_CANCEL: "content disable",
      ORDER_DONE: "content active",
      EXECUTED_DONE: "content disable",
      EXECUTED_NOT_ACCEPTABLE: "content select"
    }
  }

  changeOrderStatus(status) {
    this.flowchartParent.map(parent => {
      parent["children"] = parent["children"].map(child => {
        child["class"] = this.flowchartMap[status][child["content"]];
        return child
      })
      return parent;
    })
  }

  selectOrderStatus($event) {
    this.changeOrderStatus($event);
  }

}
