import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MitiService } from '../_services/miti.service';
import { TokenstorageService } from '../_services/tokenstorage.service';

@Component({
  selector: 'app-deletemiti',
  templateUrl: './delete-miti.component.html',
  styleUrls: ['./delete-miti.component.css'],
})
export class DeleteMitiComponent implements OnInit {
  currentUser: any;
  isLoggedIn = false;
  mitiId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mitiService: MitiService,
    private token: TokenstorageService
  ) {}

  deleteMiti(mitiId: string) {
    return this.mitiService.deleteMiti(mitiId).subscribe(() => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/mitiapp']);
      console.log('DELETE Miti:', mitiId);
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();

    if (this.isLoggedIn) {
      const user = this.token.getUser();

      this.currentUser = user.username;
    }
    this.mitiId = this.route.snapshot.params['id'];
  }
}
