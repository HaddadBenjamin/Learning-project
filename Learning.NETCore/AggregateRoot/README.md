**Année de développement :** 2020.</br>

<ins>**Ce projet est un modèle de projet pour réaliser une API avec les options suivantes :**</ins>
- <ins>**CQRS :**</ins> Mediator / AggregateRoot / Session / Repository / Unit Of Work.
- <ins>**Audit :**</ins> commandes, les queries, évènements, les changements effectués sur votre base de données, les performances de vos endpoints.

<ins>**Pour réutiliser ce projet il vous faut :**</ins>
- Choisir les options que votre aggregate root doit supporter, à savoir avec ou sans audit, suppression logique, event sourcing.
- Modifier l'appsettings.json de sorte à définir le type d'audit que vous souhaitez supporter.
- Supprimer les répertoires Learning.AggregateRoot.Domain.ExampleToDelete et Learning.AggregateRoot.Infrastructure.ExampleToDelete.
- Modifier le nom du fichier YourDbContext et adapter les fichiers présents dans Learning.AggregateRoot.Infrastructure.ExampleToRedefine.
- Modifier la chaîne de connection de votre DbContext dans le fichier Startup.cs.
