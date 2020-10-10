Implémentation brouillon des modèles de conceptions AggregateRoot, Session, Repository, UnitOfWork.

Pour réutiliser ce projet il vous faut :
- Choisir les options que votre aggregate root doit supporter, à savoir avec ou sans audit, suppression logique, event sourcing.
- Vous pouvez désactiver l'audit de vos commandes et de vos évènements en modifiant votre Médiateur.
- Si vous avez fait le choix de l'audit, créer une implémentation de IAuthentificationContextUserProvider et l'injecter.