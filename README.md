# filesystemjs

Simple persistence in a browser's localStorage

Filesystem is a set of object used to read/write files to a persistent
storage (a Device) give the name of the filesystem (a mountpoint) and
a folder name (a prefix) and the filename itself.
Size, create and update times are maintained through a meta-data file
(the Folder and FolderEntries)

as an example, we'll use the LocalStorageDevice:

```js
  fs = new Filesystem('filesystem', new LocalStorageDevice())
  fs.listFiles()
  []
  fs.writeFile('some-file', {a: 1, b: 2})
  true
  fs.writeFile('another-file', {a: 1, b: 2, c: 3, d:4})
  true
  fs.listFiles()
  (2) ["some-file", "another-file"]
  fs.folderEntry('another-file')
  FolderEntry {createdAt: 1562448736461, updatedAt: 1562448736461, filename: "another-file", size: 25}
  fs.writeFile('another-file', {a: 1, b: 2, c: 3, d:4, e:5})
  true
  fs.folderEntry('another-file')
  FolderEntry {createdAt: 1562448736461, updatedAt: 1562448799810, filename: "another-file", size: 31}
  fs.listFiles()
  (2) ["some-file", "another-file"]
  fs.removeFile('another-file')
  undefined
  fs.listFiles()
  ["some-file"]
  fs.readFile('some-file')
  {a: 1, b: 2}
  fs.writeFile('a-third-file', {g: 'gg'})
  true
  fs.listFolderEntries()
  (2) [FolderEntry, FolderEntry]
     0: FolderEntry {createdAt: 1562448727853, updatedAt: 1562449054075, filename: "some-file", size: 13}
     1: FolderEntry {createdAt: 1562449054075, updatedAt: 1562449054075, filename: "a-third-file", size: 10}
```

LocalStorage will now have:

the folder:
```
  KEY: diffeo-filesystem-folder
  VALUE: {"folderEntries": [
    ["some-file",{"filename":"some-file","size":13,"createdAt":1562447073070,"updatedAt":1562447073070}],
    ["another-file",{"filename":"a-third-file","size":10,"createdAt":1562447073070,"updatedAt":1562447073070}]
  ]}
``

the files:

```
           KEY                                          VALUE
   diffeo-filesystem-file:some-file                {"a":1,"b":2}
   diffeo-filesystem-file:a-third-file             {"g":"gg"}
```
