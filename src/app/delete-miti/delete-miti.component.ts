import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MitiService } from '../miti-service/miti.service';

@Component({
  selector: 'app-deletemiti',
  templateUrl: './delete-miti.component.html',
  styleUrls: ['./delete-miti.component.css'],
})
export class DeleteMitiComponent implements OnInit {
  mitiId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mitiService: MitiService
  ) {}

  deleteMiti(mitiId: string) {
    return this.mitiService.deleteMiti(mitiId).subscribe(() => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['']);
      console.log('DELETE Miti:', mitiId);
    });
  }

  ngOnInit(): void {
    this.mitiId = this.route.snapshot.params['id'];
  }
}
