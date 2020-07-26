import { default as Filesystem, Folder, LocalStorageDevice } from './Filesystem';

const file1Name = 'file1';
const file1Value = JSON.stringify({ a: 1, b: 2 });
const file2Name = 'file2';
const file2Value = JSON.stringify({ a: 1, b: 2, g: 'gg' });
const file3Name = 'file3';
const file3Value = JSON.stringify({ a: 1, b: 2, aa: 'a' });
const file4Name = 'file4';
const file4Value = JSON.stringify({ a: 'this is a test', b: 'another one', aa: 'a' });

describe('Filesystem', () => {
  let filesystem;

  beforeAll(() => {
    filesystem = new Filesystem('filesystem', new LocalStorageDevice());
  });

  describe('by default', () => {
    it('is defined', () => {
      expect(filesystem).toBeInstanceOf(Filesystem);
      expect(filesystem.folder).toBeInstanceOf(Folder);
    });
    it('is empty', () => {
      expect(filesystem.folder.size).toEqual(0);
    });
  });
  describe('adding', () => {
    it('adds the file successfully', () => {
      filesystem.writeFile(file1Name, file1Value);
      expect(filesystem.readFile(file1Name)).toEqual(file1Value);
    });
    it('has one entry now', () => {
      expect(filesystem.folder.size).toEqual(1);
    });
    it('adds a second file successfully', () => {
      filesystem.writeFile(file2Name, file2Value);
      expect(filesystem.readFile(file2Name)).toEqual(file2Value);
    });
    it('now has two entries', () => {
      expect(filesystem.folder.size).toEqual(2);
    });
  });
  describe('removing', () => {
    it('removes the first file successfully', () => {
      filesystem.removeFile(file1Name);
      expect(filesystem.readFile(file1Name)).toBeNull();
    });
    it('has one entry now', () => {
      expect(filesystem.folder.size).toEqual(1);
    });
    it('but the second file is still there', () => {
      expect(filesystem.readFile(file2Name)).toEqual(file2Value);
    });
    it('can remove the second file successfully', () => {
      filesystem.removeFile(file2Name);
      expect(filesystem.readFile(file2Name)).toBeNull();
    });
    it('has no entries', () => {
      expect(filesystem.folder.size).toEqual(0);
    });
  });

  describe('sizing', () => {
    it('removes older files as the max storage limit exceeds highwater', () => {
      filesystem.writeFile(file1Name, file1Value);
      filesystem.writeFile(file2Name, file2Value);
      filesystem.writeFile(file3Name, file3Value);
      filesystem.maxSize = filesystem.totalSize * 0.95;
      filesystem.writeFile(file4Name, file4Value);
      expect(filesystem.listFiles()).toEqual(['file3', 'file4']);
      filesystem.writeFile(file1Name, file1Value);
      expect(filesystem.listFiles()).toEqual(['file1']);
      filesystem.writeFile(file2Name, file2Value);
      expect(filesystem.listFiles()).toEqual(['file1', 'file2']);
      filesystem.writeFile(file3Name, file3Value);
      expect(filesystem.listFiles()).toEqual(['file1', 'file2', 'file3']);
    });
  });
});
