import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
} from '@angular/core';

@Component({
    selector: 'mini-cards',
    template: `
        <div class="flex items-start mt-6 mx-6">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
                <div class="flex flex-col">
                    <div class="flex items-center">
                        <div class="font-medium text-secondary leading-5">
                            Máximo
                        </div>
                        <mat-icon
                            class="ml-1.5 icon-size-4 text-hint"
                            [svgIcon]="'heroicons_solid:information-circle'"
                            [matTooltip]="
                                'Score is calculated by using the historical ratio between Page Views and Visitors. Best score is 1000, worst score is 0.'
                            "
                        ></mat-icon>
                    </div>
                    <div class="flex items-start mt-2">
                        <div
                            class="text-4xl font-bold tracking-tight leading-none"
                        >
                            57280,4
                        </div>
                        <div class="flex items-center ml-2">
                            <mat-icon
                                class="icon-size-5 text-green-500"
                                [svgIcon]="'heroicons_solid:arrow-circle-up'"
                            ></mat-icon>
                            <div
                                class="ml-1 text-md font-medium text-green-500"
                            >
                                42.9%
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col">
                    <div class="flex items-center">
                        <div class="font-medium text-secondary leading-5">
                            Mínimo
                        </div>
                        <mat-icon
                            class="ml-1.5 icon-size-4 text-hint"
                            [svgIcon]="'heroicons_solid:information-circle'"
                            [matTooltip]="
                                'Average Ratio is the average ratio between Page Views and Visitors'
                            "
                        ></mat-icon>
                    </div>
                    <div class="flex items-start mt-2">
                        <div
                            class="text-4xl font-bold tracking-tight leading-none"
                        >
                            53244,5
                        </div>
                        <div class="flex items-center ml-2">
                            <mat-icon
                                class="icon-size-5 text-red-500"
                                [svgIcon]="'heroicons_solid:arrow-circle-down'"
                            ></mat-icon>
                            <div class="ml-1 text-md font-medium text-red-500">
                                13.1%
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col">
                    <div class="flex items-center">
                        <div class="font-medium text-secondary leading-5">
                            Media
                        </div>
                        <mat-icon
                            class="ml-1.5 icon-size-4 text-hint"
                            [svgIcon]="'heroicons_solid:information-circle'"
                            [matTooltip]="
                                'Predicted Ratio is calculated by using historical ratio, current trends and your goal targets.'
                            "
                        ></mat-icon>
                    </div>
                    <div class="flex items-start mt-2">
                        <div
                            class="text-4xl font-bold tracking-tight leading-none"
                        >
                            56146,74
                        </div>
                        <div class="flex items-center ml-2">
                            <mat-icon
                                class="icon-size-5 text-green-500"
                                [svgIcon]="'heroicons_solid:arrow-circle-up'"
                            ></mat-icon>
                            <div
                                class="ml-1 text-md font-medium text-green-500"
                            >
                                22.2%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,

    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniCardsComponent {}
