import {existsSync,copyFileSync,mkdirSync,statSync} from 'fs'
import {promises as fs} from 'fs';
import {resolve,dirname,join,relative} from 'path'
import {config} from '../../config.js'
import { createHash } from 'crypto';


function isNewer(filepath,targetfile){
  const t1 = statSync(filepath).mtime
  const t2 = statSync(targetfile).mtime
  return (t1>t2)
}

//Note 'imp*ort.me*ta.en*v.BA*SE_URL' only works from Astro component not from remark-rel-asset plugin
function relAssetToUrl(relativepath,refFile){
  const refdir = join(config.rootdir,"content",dirname(refFile))
    let newurl = relativepath
    const filepath = join(refdir,relativepath)
    console.log(`relAssetToUrl> filepath = ${filepath}`)
    if(existsSync(filepath)){
      //console.log(`   * impo*rt.me*ta.ur*l = ${import.meta.url}`)

      let rel_outdir = config.outDir
      if(import.meta.env.MODE == "development"){
        rel_outdir = "public"
      }
      const targetroot = join(config.rootdir,rel_outdir,"raw")
      const filerootrel = relative(config.rootdir,refdir)
      const targetpath = resolve(targetroot,filerootrel)
      const targetfile = join(targetpath,relativepath)
      const targetdir = dirname(targetfile)
      //console.log(`copy from '${filepath}' to '${targetfile}'`)
      const newpath = join("/raw/",filerootrel,relativepath)
      newurl = newpath.replaceAll('\\','/')
      if(!existsSync(targetdir)){
        mkdirSync(targetdir,{ recursive: true })
      }
      if(!existsSync(targetfile)){
        copyFileSync(filepath,targetfile)
        console.log(`utils.js> * new asset url = '${newurl}'`)
      }
      else if(isNewer(filepath,targetfile)){
        copyFileSync(filepath,targetfile)
        console.log(`utils.js> * updated asset url = '${newurl}'`)
      }else{
        console.log(`utils.js> * existing asset url = '${newurl}'`)
      }
    }

    return newurl
}

function assetToUrl(path,refFile){
  const external = path.startsWith('http')
  let src = path
  if(!external){
    if(!path.startsWith("/")){
      src = relAssetToUrl(path,refFile)
    }
  }
  return src
}

function assetUrlToPath(src){
  let rel_outdir = config.outDir
  if(import.meta.env.MODE == "development"){
    rel_outdir = "public"
  }
  return join(config.rootdir,rel_outdir,src)
}

async function load_json(rel_path){
  const path = join(config.rootdir,rel_path)
  const text = await fs.readFile(path,'utf-8')
  return JSON.parse(text)
}

function generateShortMD5(text) {
  const hash = createHash('md5').update(text, 'utf8').digest('hex');
  return hash.substring(0, 8);
}

async function exists(filePath) {
  try {
    await fs.access(filePath, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
}

async function save_file(filePath,content){
  const directory = dirname(filePath)
  if(!await exists(directory)){
    await fs.mkdir(directory, { recursive: true });
  }
  return fs.writeFile(filePath,content)
}

async function load_yaml(rel_path){
  const path = join(config.rootdir,rel_path)
  const fileContent = await fs.readFile(path,'utf-8')
  const data = yaml.load(fileContent);
  return data;
}

export{
    assetToUrl,
    relAssetToUrl,
    assetUrlToPath,
    load_json,
    generateShortMD5,
    exists,
    save_file,
    load_yaml
}
