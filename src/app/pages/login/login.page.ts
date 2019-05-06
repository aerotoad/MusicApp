import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
  ) { }

  async login() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    await loading.present();
    localStorage.setItem('sampleLoggedInUser', 'true');
    this.router.navigate(['/main']);
    await loading.dismiss();
  }

}
