
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard.service';
import { TemplateComponent } from './modules/template/template.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';

const route: Routes = [
    {
        path: '',
        loadChildren: 'app/modules/login/login.module#LoginModule'
    },
    {
        path: 'gestao',
        component: TemplateComponent,
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'clientes',
                loadChildren: 'app/modules/clientes/clientes-list/clientes-list.module#ClientesListModule',
                data: { state: 'clientes' }
            },
            {
                path: 'cliente/novo',
                loadChildren: 'app/modules/clientes/clientes-form/clientes-form.module#ClientesFormModule',
                data: { state: 'clientes_create' }
            },
            {
                path: 'cliente/update/:id',
                loadChildren: 'app/modules/clientes/clientes-form/clientes-form.module#ClientesFormModule',
                data: { state: 'clientes_update' }
            },
            {
                path: 'funcionarios',
                loadChildren: 'app/modules/funcionarios/funcionarios-list/funcionarios-list.module#FuncionariosListModule',
                data: { state: 'funcionarios' }
            },
            {
                path: 'funcionario/novo',
                loadChildren: 'app/modules/funcionarios/funcionarios-form/funcionarios-form.module#FuncionariosFormModule',
                data: { state: 'funcionarios_create' }
            },
            {
                path: 'funcionario/update/:id',
                loadChildren: 'app/modules/funcionarios/funcionarios-form/funcionarios-form.module#FuncionariosFormModule',
                data: { state: 'funcionarios_update' }
            },
            {
                path: '**',
                component: NotFoundComponent
            }
        ]
    }
    ,
    {
        path: 'financeiro',
        component: TemplateComponent,
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'inicio',
                loadChildren: 'app/modules/home/home.module#HomeModule',
                data: { state: 'financeiro_inicio' }
            },
            {
                path: '**',
                component: NotFoundComponent
            }
        ]
    }
    ,
    {
        path: 'painel',
        component: TemplateComponent,
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'inicio',
                loadChildren: 'app/modules/home/home.module#HomeModule',
                data: { state: 'painel_inicio' }
            },
            {
                path: 'profile/list',
                loadChildren: 'app/modules/profile/profile-list/profile-list.module#ProfileListModule',
                data: { state: 'profile' }
            },
            {
                path: 'profile/create',
                loadChildren: 'app/modules/profile/profile-form/profile-form.module#ProfileFormModule',
                data: { state: 'profile_create' }
            },
            {
                path: 'profile/update/:id',
                loadChildren: 'app/modules/profile/profile-form/profile-form.module#ProfileFormModule',
                data: { state: 'profile_update' }
            },
            {
                path: 'pessoas/list',
                loadChildren: 'app/modules/pessoas/pessoas-list/pessoas-list.module#PessoasListModule',
                data: { state: 'pessoas_list' }
            },
            {
                path: 'pessoas/create',
                loadChildren: 'app/modules/pessoas/pessoas-form/pessoas-form.module#PessoasFormModule',
                data: { state: 'pessoas_create' }
            },
            {
                path: 'pessoas/update/:id',
                loadChildren: 'app/modules/pessoas/pessoas-form/pessoas-form.module#PessoasFormModule',
                data: { state: 'pessoas_update' }
            },
            {
                path: 'permission/list',
                loadChildren: 'app/modules/permission/permission-list/permission-list.module#PermissionListModule',
                data: { state: 'permission_list' }
            },
            {
                path: 'permission/create',
                loadChildren: 'app/modules/permission/permission-form/permission-form.module#PermissionFormModule',
                data: { state: 'permission_create' }
            },
            {
                path: 'permission/update/:id',
                loadChildren: 'app/modules/permission/permission-form/permission-form.module#PermissionFormModule',
                data: { state: 'permission_update' }
            },
            {
                path: 'users/list',
                loadChildren: 'app/modules/users/users-list/users-list.module#UsersListModule',
                data: { state: 'users_list' }
            },
            {
                path: 'users/create',
                loadChildren: 'app/modules/users/users-form/users-form.module#UsersFormModule',
                data: { state: 'users_create' }
            },
            {
                path: 'users/update/:id',
                loadChildren: 'app/modules/users/users-form/users-form.module#UsersFormModule',
                data: { state: 'users_update' }
            },
            {
                path: 'my-account',
                loadChildren: 'app/modules/my-account/my-account.module#MyAccountModule',
                data: { state: 'my_account' }
            },
            {
                path: 'menu/list',
                loadChildren: 'app/modules/menu/menu-list/menu-list.module#MenuListModule',
                data: { state: 'menu_list' }
            },
            {
                path: 'menu/create',
                loadChildren: 'app/modules/menu/menu-form/menu-form.module#MenuFormModule',
                data: { state: 'menu_create' }
            },
            {
                path: 'menu/update/:id',
                loadChildren: 'app/modules/menu/menu-form/menu-form.module#MenuFormModule',
                data: { state: 'menu_update' }
            },
            {
                path: 'permission-action/list',
                loadChildren: 'app/modules/permissionAction/permissionAction-list/permissionAction-list.module#PermissionActionListModule',
                data: { state: 'permissionAction_list' }
            },
            {
                path: 'permission-action/create',
                loadChildren: 'app/modules/permissionAction/permissionAction-form/permissionAction-form.module#PermissionActionFormModule',
                data: { state: 'permissionAction_create' }
            },
            {
                path: 'permission-action/update/:id',
                loadChildren: 'app/modules/permissionAction/permissionAction-form/permissionAction-form.module#PermissionActionFormModule',
                data: { state: 'permissionAction_update' }
            },
            {
                path: 'permission-type/list',
                loadChildren: 'app/modules/permissionType/permissionType-list/permissionType-list.module#PermissionTypeListModule',
                data: { state: 'permissionType_list' }
            },
            {
                path: 'permission-type/create',
                loadChildren: 'app/modules/permissionType/permissionType-form/permissionType-form.module#PermissionTypeFormModule',
                data: { state: 'permissionType_create' }
            },
            {
                path: 'permission-type/update/:id',
                loadChildren: 'app/modules/permissionType/permissionType-form/permissionType-form.module#PermissionTypeFormModule',
                data: { state: 'permissionType_update' }
            },
            {
                path: '**',
                component: NotFoundComponent
            }
        ]
    }
];

@NgModule({
    // imports: [RouterModule.forRoot(routes, { useHash: true })],
    imports: [RouterModule.forRoot(route)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule { }
export const routedComponents = [
    NotFoundComponent
];
