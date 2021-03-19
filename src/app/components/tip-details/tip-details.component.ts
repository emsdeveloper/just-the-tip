import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tip-details',
  templateUrl: './tip-details.component.html',
  styleUrls: ['./tip-details.component.scss'],
})
export class TipDetailsComponent implements OnInit {
  @Input() percent: string;
  @Input() value: string;
  @Input() message: string;
  @Input() color: string;
  @Input() trophy: string;

  constructor() { }

  ngOnInit() {
  }

}
