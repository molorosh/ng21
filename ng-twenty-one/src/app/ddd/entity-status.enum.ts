/* the basic states of the entity lifecycle */
enum EntityStatus {
    /* The entity has been created but not yet persisted */
    Created = 'Created',
    /* The entity has been modified since it was last persisted */
    Updated = 'Updated',
    /* The entity is persisted and has no unsaved changes */
    Saved = 'Saved',
    /* The entity has been marked for deletion */
    Deleted = 'Deleted',
}
export { EntityStatus };