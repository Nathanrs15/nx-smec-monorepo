import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('../feature-graph/feature-graph.module').then(
                (m) => m.FeatureGraphModule
            ),
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class HistoryGraphShellWebModule {}
