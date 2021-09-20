import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';
import { GeneratorOptions } from './schema';

export default async function (tree: Tree, schema: GeneratorOptions) {
  await libraryGenerator(tree, { name: `${schema.name}-${schema.type || ''}` });
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
