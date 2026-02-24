export enum SystemRole {
    ADMIN = "ADMIN",
    USER = "USER",
}

export enum PropertyRole {
    OWNER = "OWNER",
    TENANT = "TENANT",
    MANAGER = "MANAGER",
}

export enum PropertyPermission {
    CREATE_PROPERTY = "CREATE_PROPERTY",
    READ_PROPERTY = "READ_PROPERTY",
    UPDATE_PROPERTY = "UPDATE_PROPERTY",
    DELETE_PROPERTY = "DELETE_PROPERTY",
    ADD_TENANT = "ADD_TENANT",
    REMOVE_TENANT = "REMOVE_TENANT",
    VIEW_TENANTS = "VIEW_TENANTS",
    // CREATE_LEASE = "CREATE_LEASE",
    // VIEW_LEASE = "VIEW_LEASE",
    // TERMINATE_LEASE = "TERMINATE_LEASE",
    ADD_MANAGER = "ADD_MANAGER",
    REMOVE_MANAGER = "REMOVE_MANAGER",

}


export const propertyRolePermissions: Record<PropertyRole, PropertyPermission[]> = {
    [PropertyRole.OWNER]: [
        PropertyPermission.READ_PROPERTY,
        PropertyPermission.UPDATE_PROPERTY,
        PropertyPermission.DELETE_PROPERTY,
        PropertyPermission.ADD_TENANT,
        PropertyPermission.REMOVE_TENANT,
        PropertyPermission.VIEW_TENANTS,
        PropertyPermission.ADD_MANAGER,
        PropertyPermission.REMOVE_MANAGER,
    ],
    [PropertyRole.MANAGER]: [
        PropertyPermission.READ_PROPERTY,
        PropertyPermission.ADD_TENANT,
        PropertyPermission.REMOVE_TENANT,
        PropertyPermission.VIEW_TENANTS,
    ],
    [PropertyRole.TENANT]: [
        PropertyPermission.READ_PROPERTY,
    ]
}

export const systemRolePermissions: Record<SystemRole, PropertyPermission[]> = {
    [SystemRole.ADMIN]: [
        PropertyPermission.CREATE_PROPERTY,
        PropertyPermission.READ_PROPERTY,
        PropertyPermission.UPDATE_PROPERTY,
        PropertyPermission.DELETE_PROPERTY,
        PropertyPermission.ADD_TENANT,
        PropertyPermission.REMOVE_TENANT,
        PropertyPermission.VIEW_TENANTS,
        PropertyPermission.ADD_MANAGER,
        PropertyPermission.REMOVE_MANAGER,
    ],
    [SystemRole.USER]: [
        PropertyPermission.CREATE_PROPERTY,
    ],
};