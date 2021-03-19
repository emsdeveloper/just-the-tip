import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';

import { TipDetailsComponent } from '../../components/tip-details/tip-details.component';

import { underFifteenMessages } from '../../../assets/data/under-fifteen';
import { fifteenMessages } from '../../../assets/data/fifteen';
import { twentyTwoMessages } from '../../../assets/data/twenty-two';
import { thirtyMessages } from '../../../assets/data/thirty';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public billAmount: number;
  public fifteenPercent: string;
  public twentyTwoPercent: string;
  public thirtyPercent: string;
  public underFifteenMessage: string;
  public fifteenMessage: string;
  public twentyTwoMessage: string;
  public thirtyMessage: string;
  public calculationComplete: boolean = false;

  constructor(
    public loadingController: LoadingController,
    public modalController: ModalController) { }

  ngOnInit() {}

  async calculateTip() {
    if (isNaN(this.billAmount)) {
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Calculating...',
      duration: 2000
    });
    await loading.present();

    this.fifteenPercent = this.roundTip(.15);
    this.twentyTwoPercent = this.roundTip(.22);
    this.thirtyPercent = this.roundTip(.30);
    this.underFifteenMessage = this.messageRandomizer(underFifteenMessages);
    this.fifteenMessage = this.messageRandomizer(fifteenMessages);
    this.twentyTwoMessage = this.messageRandomizer(twentyTwoMessages);
    this.thirtyMessage = this.messageRandomizer(thirtyMessages);

    this.calculationComplete = true;
    await loading.dismiss();
  }

  roundTip(amount): string {
    return (Math.round((this.billAmount * amount) * 100) / 100)
      .toLocaleString("en", {useGrouping: false, minimumFractionDigits: 2});
  }

  messageRandomizer(messages: Array<string>): string {
    return messages[Math.floor(Math.random() * messages.length)];
  }

  async viewTipDetails(amount: string) {
    let tipDetails = this.getTipDetails(amount);

    const modal = await this.modalController.create({
      component: TipDetailsComponent,
      componentProps: {
        'percent': tipDetails.percent,
        'value': tipDetails.value,
        'message': tipDetails.message,
        'color': tipDetails.color,
        'trophy': tipDetails.trophy
      }
    });
    return await modal.present();
  }

  getTipDetails(amount) {
    let details; 

    switch (amount) {
      case 'under15':
        details = {
          percent: 'less than 15%',
          value: '0',
          message: this.underFifteenMessage,
          color: 'danger',
          trophy: 'Trophy of Shame'
        }
        break;
      case '15':
        details = {
          percent: '15%',
          value: this.fifteenPercent,
          message: this.fifteenMessage,
          color: 'warning',
          trophy: 'Trophy of Mediocrity'
        }
        break;
      case '22':
        details = {
          percent: '22%',
          value: this.twentyTwoPercent,
          message: this.twentyTwoMessage,
          color: 'success',
          trophy: 'Trophy of Compassion'
        }
        break;
      case '30':
        details = {
          percent: '30%',
          value: this.thirtyPercent,
          message: this.thirtyMessage,
          color: 'success',
          trophy: 'Trophy of Excellence'
        }
        break;
    }
    return details;
  }
}
