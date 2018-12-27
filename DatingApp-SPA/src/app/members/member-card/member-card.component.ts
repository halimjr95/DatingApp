import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_model/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;
  @Input() unlike?: boolean;
  constructor(private alertify: AlertifyService,
    private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
  }

  sendLike() {
    this.userService.sendLike(this.authService.decodedToken.nameid, this.user.id).subscribe(data => {
      this.alertify.success('You have liked ' + this.user.knownAs);
    }, error => {
      this.alertify.error(error);
    });
  }

  unLike() {
    this.alertify.confirm('Are you sure you want to un like ' + this.user.knownAs, () => {
      this.userService.unLike(this.authService.decodedToken.nameid, this.user.id).subscribe(data => {
        this.alertify.success('You have Unliked ' + this.user.knownAs);
      }, error => {
        this.alertify.error(error);
      });
    });
  }
}
