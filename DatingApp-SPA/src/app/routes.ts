import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetialComponent } from './members/member-detial/member-detial.component';
import { MemberDetailResolver } from './_resolvers/member-detial-resolver';
import { MemberListResolver } from './_resolvers/member-list-resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit-resolver';
import { PreventUnsaveChangesGuard } from './_guards/prevent-unsave-changes.guard';
import { ListsResolver } from './_resolvers/lists-resolver';
import { MessagesResolver } from './_resolvers/messages-resolver';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'members', component: MemberListComponent,
            resolve: {users: MemberListResolver}},
            {path: 'members/:id', component: MemberDetialComponent,
            resolve: {user: MemberDetailResolver}},
            {path: 'member/edit', component: MemberEditComponent,
            resolve: {user: MemberEditResolver},
            canDeactivate: [PreventUnsaveChangesGuard]},
            {path: 'lists', component: ListsComponent, resolve: {users: ListsResolver}},
            {path: 'messages', component: MessagesComponent, resolve: {messages: MessagesResolver}}
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'},
];
