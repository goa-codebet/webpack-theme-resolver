const path = require('path');
const fs = require('fs');

class ThemeResolverPlugin {
  constructor(options = {}) {
    this.source = options.source || 'resolve';
    this.target = options.target || 'resolve';
    this.themePath = options.themePath || 'theme/';
    this.basePath = path.resolve(__dirname, options.basePath || '');
    
    this.basePathRegExp = null;
    if (this.basePath) {
      this.basePathRegExp = new RegExp(this.basePath+"/?");
    }
  }

  apply(resolver) {
    const target = resolver.ensureHook(this.target);
  
    resolver.getHook(this.source).tapAsync('ThemeResolverPlugin', (req, resCtx, cb) => {
      // Store project path (find better way to do this..)
      if (req.context.issuer == '' && !this.basePath) {
        this.basePath = req.path;
        this.basePathRegExp = new RegExp(this.basePath+"/?");
        return cb();
      }

      // Replace project path to get a relative url
      const relPath = req.path.replace(this.basePathRegExp, '')+'/';

      // Create default and theme path
      const defautlPath = path.resolve(req.path, req.request);
      const themePath = path.resolve(this.basePath, this.themePath, relPath, req.request);
      console.log({bp:this.basePath, tp:this.themePath, rp:relPath, r:req.request}, themePath)
      
      // Skip resolve if we're already in the theme path
      if (defautlPath === themePath) {
        return cb();
      }
      
      // Filter request outside the basePath
      if (!this.basePathRegExp.test(defautlPath)) {
        return cb();
      }

      // Check if theme path exists and resolve to it if it does if not use default.
      fs.access(themePath, fs.constants.F_OK, err => {
        console.log('FS', !!err, defautlPath, themePath)
        resolver.doResolve(target, {
          ...req,
          request: err ? defautlPath : themePath
        }, null, resCtx, cb);
      })
    })
  }
}

module.exports = ThemeResolverPlugin
