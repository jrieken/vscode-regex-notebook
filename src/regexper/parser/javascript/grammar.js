(function() {
  var extend = function(destination, source) {
    if (!destination || !source) return destination;
    for (var key in source) {
      if (destination[key] !== source[key])
        destination[key] = source[key];
    }
    return destination;
  };
  
  var find = function(root, objectName) {
    var parts = objectName.split('.'),
        part;
    
    while (part = parts.shift()) {
      root = root[part];
      if (root === undefined)
        throw new Error('Cannot find object named ' + objectName);
    }
    return root;
  };
  
  var formatError = function(error) {
    var lines  = error.input.split(/\n/g),
        lineNo = 0,
        offset = 0;
    
    while (offset < error.offset + 1) {
      offset += lines[lineNo].length + 1;
      lineNo += 1;
    }
    var message = 'Line ' + lineNo + ': expected ' + error.expected + '\n',
        line    = lines[lineNo - 1];
    
    message += line + '\n';
    offset  -= line.length + 1;
    
    while (offset < error.offset) {
      message += ' ';
      offset  += 1;
    }
    return message + '^';
  };
  
  var Grammar = {
    __consume__root: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["root"] = this._nodeCache["root"] || {};
      var cached = this._nodeCache["root"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      var index2 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "/") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("/", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"/\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        address2 = this.__consume__regexp();
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.regexp = address2;
          var address3 = null;
          var slice2 = null;
          if (this._input.length > this._offset) {
            slice2 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice2 = null;
          }
          if (slice2 === "/") {
            var klass1 = this.constructor.SyntaxNode;
            var type1 = null;
            address3 = new klass1("/", this._offset, []);
            if (typeof type1 === "object") {
              extend(address3, type1);
            }
            this._offset += 1;
          } else {
            address3 = null;
            var slice3 = null;
            if (this._input.length > this._offset) {
              slice3 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice3 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"/\""};
            }
          }
          if (address3) {
            elements0.push(address3);
            text0 += address3.textValue;
            var address4 = null;
            var remaining0 = 0, index3 = this._offset, elements1 = [], text1 = "", address5 = true;
            while (address5) {
              var slice4 = null;
              if (this._input.length > this._offset) {
                slice4 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice4 = null;
              }
              if (slice4 && /^[yigmu]/.test(slice4)) {
                var klass2 = this.constructor.SyntaxNode;
                var type2 = null;
                address5 = new klass2(slice4, this._offset, []);
                if (typeof type2 === "object") {
                  extend(address5, type2);
                }
                this._offset += 1;
              } else {
                address5 = null;
                var slice5 = null;
                if (this._input.length > this._offset) {
                  slice5 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice5 = null;
                }
                if (!this.error || this.error.offset <= this._offset) {
                  this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[yigmu]"};
                }
              }
              if (address5) {
                elements1.push(address5);
                text1 += address5.textValue;
                remaining0 -= 1;
              }
            }
            if (remaining0 <= 0) {
              this._offset = index3;
              var klass3 = this.constructor.SyntaxNode;
              var type3 = null;
              address4 = new klass3(text1, this._offset, elements1);
              if (typeof type3 === "object") {
                extend(address4, type3);
              }
              this._offset += text1.length;
            } else {
              address4 = null;
            }
            if (address4) {
              elements0.push(address4);
              text0 += address4.textValue;
              labelled0.flags = address4;
            } else {
              elements0 = null;
              this._offset = index2;
            }
          } else {
            elements0 = null;
            this._offset = index2;
          }
        } else {
          elements0 = null;
          this._offset = index2;
        }
      } else {
        elements0 = null;
        this._offset = index2;
      }
      if (elements0) {
        this._offset = index2;
        var klass4 = this.constructor.SyntaxNode;
        var type4 = null;
        address0 = new klass4(text0, this._offset, elements0, labelled0);
        if (typeof type4 === "object") {
          extend(address0, type4);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      if (address0) {
        var type5 = find(this.constructor, "Root");
        if (typeof type5 === "object") {
          extend(address0, type5);
        }
      } else {
        this._offset = index1;
        var index4 = this._offset, elements2 = [], labelled1 = {}, text2 = "";
        var address6 = null;
        address6 = this.__consume__regexp();
        if (address6) {
          elements2.push(address6);
          text2 += address6.textValue;
          labelled1.regexp = address6;
          var address7 = null;
          var index5 = this._offset;
          var slice6 = null;
          if (this._input.length > this._offset) {
            slice6 = this._input.substring(this._offset, this._offset + 0);
          } else {
            slice6 = null;
          }
          if (slice6 === "") {
            var klass5 = this.constructor.SyntaxNode;
            var type6 = null;
            address7 = new klass5("", this._offset, []);
            if (typeof type6 === "object") {
              extend(address7, type6);
            }
            this._offset += 0;
          } else {
            address7 = null;
            var slice7 = null;
            if (this._input.length > this._offset) {
              slice7 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice7 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\""};
            }
          }
          if (address7) {
          } else {
            this._offset = index5;
            var klass6 = this.constructor.SyntaxNode;
            var type7 = null;
            address7 = new klass6("", this._offset, []);
            if (typeof type7 === "object") {
              extend(address7, type7);
            }
            this._offset += 0;
          }
          if (address7) {
            elements2.push(address7);
            text2 += address7.textValue;
            labelled1.flags = address7;
          } else {
            elements2 = null;
            this._offset = index4;
          }
        } else {
          elements2 = null;
          this._offset = index4;
        }
        if (elements2) {
          this._offset = index4;
          var klass7 = this.constructor.SyntaxNode;
          var type8 = null;
          address0 = new klass7(text2, this._offset, elements2, labelled1);
          if (typeof type8 === "object") {
            extend(address0, type8);
          }
          this._offset += text2.length;
        } else {
          address0 = null;
        }
        if (address0) {
          var type9 = find(this.constructor, "Root");
          if (typeof type9 === "object") {
            extend(address0, type9);
          }
        } else {
          this._offset = index1;
        }
      }
      return this._nodeCache["root"][index0] = address0;
    },
    __consume__regexp: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["regexp"] = this._nodeCache["regexp"] || {};
      var cached = this._nodeCache["regexp"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      address1 = this.__consume__match();
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.match = address1;
        var address2 = null;
        var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          var index3 = this._offset, elements2 = [], labelled1 = {}, text2 = "";
          var address4 = null;
          var slice0 = null;
          if (this._input.length > this._offset) {
            slice0 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice0 = null;
          }
          if (slice0 === "|") {
            var klass0 = this.constructor.SyntaxNode;
            var type0 = null;
            address4 = new klass0("|", this._offset, []);
            if (typeof type0 === "object") {
              extend(address4, type0);
            }
            this._offset += 1;
          } else {
            address4 = null;
            var slice1 = null;
            if (this._input.length > this._offset) {
              slice1 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice1 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"|\""};
            }
          }
          if (address4) {
            elements2.push(address4);
            text2 += address4.textValue;
            var address5 = null;
            address5 = this.__consume__match();
            if (address5) {
              elements2.push(address5);
              text2 += address5.textValue;
              labelled1.match = address5;
            } else {
              elements2 = null;
              this._offset = index3;
            }
          } else {
            elements2 = null;
            this._offset = index3;
          }
          if (elements2) {
            this._offset = index3;
            var klass1 = this.constructor.SyntaxNode;
            var type1 = null;
            address3 = new klass1(text2, this._offset, elements2, labelled1);
            if (typeof type1 === "object") {
              extend(address3, type1);
            }
            this._offset += text2.length;
          } else {
            address3 = null;
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var klass2 = this.constructor.SyntaxNode;
          var type2 = null;
          address2 = new klass2(text1, this._offset, elements1);
          if (typeof type2 === "object") {
            extend(address2, type2);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.alternates = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass3 = this.constructor.SyntaxNode;
        var type3 = find(this.constructor, "Regexp");
        address0 = new klass3(text0, this._offset, elements0, labelled0);
        if (typeof type3 === "object") {
          extend(address0, type3);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["regexp"][index0] = address0;
    },
    __consume__match: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["match"] = this._nodeCache["match"] || {};
      var cached = this._nodeCache["match"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var index2 = this._offset;
      address1 = this.__consume__repeat();
      this._offset = index2;
      if (!(address1)) {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 0;
      } else {
        address1 = null;
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 0, index3 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          address3 = this.__consume__match_fragment();
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index3;
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address2 = new klass1(text1, this._offset, elements1);
          if (typeof type1 === "object") {
            extend(address2, type1);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.parts = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass2 = this.constructor.SyntaxNode;
        var type2 = find(this.constructor, "Match");
        address0 = new klass2(text0, this._offset, elements0, labelled0);
        if (typeof type2 === "object") {
          extend(address0, type2);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["match"][index0] = address0;
    },
    __consume__anchor: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["anchor"] = this._nodeCache["anchor"] || {};
      var cached = this._nodeCache["anchor"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "^") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address0 = new klass0("^", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"^\""};
        }
      }
      if (address0) {
        var type1 = find(this.constructor, "Anchor");
        if (typeof type1 === "object") {
          extend(address0, type1);
        }
      } else {
        this._offset = index1;
        var slice2 = null;
        if (this._input.length > this._offset) {
          slice2 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice2 = null;
        }
        if (slice2 === "$") {
          var klass1 = this.constructor.SyntaxNode;
          var type2 = null;
          address0 = new klass1("$", this._offset, []);
          if (typeof type2 === "object") {
            extend(address0, type2);
          }
          this._offset += 1;
        } else {
          address0 = null;
          var slice3 = null;
          if (this._input.length > this._offset) {
            slice3 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice3 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"$\""};
          }
        }
        if (address0) {
          var type3 = find(this.constructor, "Anchor");
          if (typeof type3 === "object") {
            extend(address0, type3);
          }
        } else {
          this._offset = index1;
        }
      }
      return this._nodeCache["anchor"][index0] = address0;
    },
    __consume__match_fragment: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["match_fragment"] = this._nodeCache["match_fragment"] || {};
      var cached = this._nodeCache["match_fragment"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var index2 = this._offset;
      address1 = this.__consume__anchor();
      if (address1) {
      } else {
        this._offset = index2;
        address1 = this.__consume__subexp();
        if (address1) {
        } else {
          this._offset = index2;
          address1 = this.__consume__charset();
          if (address1) {
          } else {
            this._offset = index2;
            address1 = this.__consume__terminal();
            if (address1) {
            } else {
              this._offset = index2;
            }
          }
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.content = address1;
        var address2 = null;
        var index3 = this._offset;
        address2 = this.__consume__repeat();
        if (address2) {
        } else {
          this._offset = index3;
          var klass0 = this.constructor.SyntaxNode;
          var type0 = null;
          address2 = new klass0("", this._offset, []);
          if (typeof type0 === "object") {
            extend(address2, type0);
          }
          this._offset += 0;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.repeat = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass1 = this.constructor.SyntaxNode;
        var type1 = find(this.constructor, "MatchFragment");
        address0 = new klass1(text0, this._offset, elements0, labelled0);
        if (typeof type1 === "object") {
          extend(address0, type1);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["match_fragment"][index0] = address0;
    },
    __consume__repeat: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["repeat"] = this._nodeCache["repeat"] || {};
      var cached = this._nodeCache["repeat"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var index2 = this._offset;
      address1 = this.__consume__repeat_any();
      if (address1) {
      } else {
        this._offset = index2;
        address1 = this.__consume__repeat_required();
        if (address1) {
        } else {
          this._offset = index2;
          address1 = this.__consume__repeat_optional();
          if (address1) {
          } else {
            this._offset = index2;
            address1 = this.__consume__repeat_spec();
            if (address1) {
            } else {
              this._offset = index2;
            }
          }
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.spec = address1;
        var address2 = null;
        var index3 = this._offset;
        var slice0 = null;
        if (this._input.length > this._offset) {
          slice0 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice0 = null;
        }
        if (slice0 === "?") {
          var klass0 = this.constructor.SyntaxNode;
          var type0 = null;
          address2 = new klass0("?", this._offset, []);
          if (typeof type0 === "object") {
            extend(address2, type0);
          }
          this._offset += 1;
        } else {
          address2 = null;
          var slice1 = null;
          if (this._input.length > this._offset) {
            slice1 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice1 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"?\""};
          }
        }
        if (address2) {
        } else {
          this._offset = index3;
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address2 = new klass1("", this._offset, []);
          if (typeof type1 === "object") {
            extend(address2, type1);
          }
          this._offset += 0;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.greedy = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass2 = this.constructor.SyntaxNode;
        var type2 = find(this.constructor, "Repeat");
        address0 = new klass2(text0, this._offset, elements0, labelled0);
        if (typeof type2 === "object") {
          extend(address0, type2);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["repeat"][index0] = address0;
    },
    __consume__repeat_any: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["repeat_any"] = this._nodeCache["repeat_any"] || {};
      var cached = this._nodeCache["repeat_any"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "*") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "RepeatAny");
        address0 = new klass0("*", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"*\""};
        }
      }
      return this._nodeCache["repeat_any"][index0] = address0;
    },
    __consume__repeat_required: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["repeat_required"] = this._nodeCache["repeat_required"] || {};
      var cached = this._nodeCache["repeat_required"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "+") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "RepeatRequired");
        address0 = new klass0("+", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"+\""};
        }
      }
      return this._nodeCache["repeat_required"][index0] = address0;
    },
    __consume__repeat_optional: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["repeat_optional"] = this._nodeCache["repeat_optional"] || {};
      var cached = this._nodeCache["repeat_optional"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "?") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "RepeatOptional");
        address0 = new klass0("?", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"?\""};
        }
      }
      return this._nodeCache["repeat_optional"][index0] = address0;
    },
    __consume__repeat_spec: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["repeat_spec"] = this._nodeCache["repeat_spec"] || {};
      var cached = this._nodeCache["repeat_spec"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      var index2 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "{") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("{", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"{\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 1, index3 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          var slice2 = null;
          if (this._input.length > this._offset) {
            slice2 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice2 = null;
          }
          if (slice2 && /^[0-9]/.test(slice2)) {
            var klass1 = this.constructor.SyntaxNode;
            var type1 = null;
            address3 = new klass1(slice2, this._offset, []);
            if (typeof type1 === "object") {
              extend(address3, type1);
            }
            this._offset += 1;
          } else {
            address3 = null;
            var slice3 = null;
            if (this._input.length > this._offset) {
              slice3 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice3 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9]"};
            }
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index3;
          var klass2 = this.constructor.SyntaxNode;
          var type2 = null;
          address2 = new klass2(text1, this._offset, elements1);
          if (typeof type2 === "object") {
            extend(address2, type2);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.min = address2;
          var address4 = null;
          var slice4 = null;
          if (this._input.length > this._offset) {
            slice4 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice4 = null;
          }
          if (slice4 === ",") {
            var klass3 = this.constructor.SyntaxNode;
            var type3 = null;
            address4 = new klass3(",", this._offset, []);
            if (typeof type3 === "object") {
              extend(address4, type3);
            }
            this._offset += 1;
          } else {
            address4 = null;
            var slice5 = null;
            if (this._input.length > this._offset) {
              slice5 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice5 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\",\""};
            }
          }
          if (address4) {
            elements0.push(address4);
            text0 += address4.textValue;
            var address5 = null;
            var remaining1 = 1, index4 = this._offset, elements2 = [], text2 = "", address6 = true;
            while (address6) {
              var slice6 = null;
              if (this._input.length > this._offset) {
                slice6 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice6 = null;
              }
              if (slice6 && /^[0-9]/.test(slice6)) {
                var klass4 = this.constructor.SyntaxNode;
                var type4 = null;
                address6 = new klass4(slice6, this._offset, []);
                if (typeof type4 === "object") {
                  extend(address6, type4);
                }
                this._offset += 1;
              } else {
                address6 = null;
                var slice7 = null;
                if (this._input.length > this._offset) {
                  slice7 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice7 = null;
                }
                if (!this.error || this.error.offset <= this._offset) {
                  this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9]"};
                }
              }
              if (address6) {
                elements2.push(address6);
                text2 += address6.textValue;
                remaining1 -= 1;
              }
            }
            if (remaining1 <= 0) {
              this._offset = index4;
              var klass5 = this.constructor.SyntaxNode;
              var type5 = null;
              address5 = new klass5(text2, this._offset, elements2);
              if (typeof type5 === "object") {
                extend(address5, type5);
              }
              this._offset += text2.length;
            } else {
              address5 = null;
            }
            if (address5) {
              elements0.push(address5);
              text0 += address5.textValue;
              labelled0.max = address5;
              var address7 = null;
              var slice8 = null;
              if (this._input.length > this._offset) {
                slice8 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice8 = null;
              }
              if (slice8 === "}") {
                var klass6 = this.constructor.SyntaxNode;
                var type6 = null;
                address7 = new klass6("}", this._offset, []);
                if (typeof type6 === "object") {
                  extend(address7, type6);
                }
                this._offset += 1;
              } else {
                address7 = null;
                var slice9 = null;
                if (this._input.length > this._offset) {
                  slice9 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice9 = null;
                }
                if (!this.error || this.error.offset <= this._offset) {
                  this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"}\""};
                }
              }
              if (address7) {
                elements0.push(address7);
                text0 += address7.textValue;
              } else {
                elements0 = null;
                this._offset = index2;
              }
            } else {
              elements0 = null;
              this._offset = index2;
            }
          } else {
            elements0 = null;
            this._offset = index2;
          }
        } else {
          elements0 = null;
          this._offset = index2;
        }
      } else {
        elements0 = null;
        this._offset = index2;
      }
      if (elements0) {
        this._offset = index2;
        var klass7 = this.constructor.SyntaxNode;
        var type7 = null;
        address0 = new klass7(text0, this._offset, elements0, labelled0);
        if (typeof type7 === "object") {
          extend(address0, type7);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      if (address0) {
        var type8 = find(this.constructor, "RepeatSpec");
        if (typeof type8 === "object") {
          extend(address0, type8);
        }
      } else {
        this._offset = index1;
        var index5 = this._offset, elements3 = [], labelled1 = {}, text3 = "";
        var address8 = null;
        var slice10 = null;
        if (this._input.length > this._offset) {
          slice10 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice10 = null;
        }
        if (slice10 === "{") {
          var klass8 = this.constructor.SyntaxNode;
          var type9 = null;
          address8 = new klass8("{", this._offset, []);
          if (typeof type9 === "object") {
            extend(address8, type9);
          }
          this._offset += 1;
        } else {
          address8 = null;
          var slice11 = null;
          if (this._input.length > this._offset) {
            slice11 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice11 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"{\""};
          }
        }
        if (address8) {
          elements3.push(address8);
          text3 += address8.textValue;
          var address9 = null;
          var remaining2 = 1, index6 = this._offset, elements4 = [], text4 = "", address10 = true;
          while (address10) {
            var slice12 = null;
            if (this._input.length > this._offset) {
              slice12 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice12 = null;
            }
            if (slice12 && /^[0-9]/.test(slice12)) {
              var klass9 = this.constructor.SyntaxNode;
              var type10 = null;
              address10 = new klass9(slice12, this._offset, []);
              if (typeof type10 === "object") {
                extend(address10, type10);
              }
              this._offset += 1;
            } else {
              address10 = null;
              var slice13 = null;
              if (this._input.length > this._offset) {
                slice13 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice13 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9]"};
              }
            }
            if (address10) {
              elements4.push(address10);
              text4 += address10.textValue;
              remaining2 -= 1;
            }
          }
          if (remaining2 <= 0) {
            this._offset = index6;
            var klass10 = this.constructor.SyntaxNode;
            var type11 = null;
            address9 = new klass10(text4, this._offset, elements4);
            if (typeof type11 === "object") {
              extend(address9, type11);
            }
            this._offset += text4.length;
          } else {
            address9 = null;
          }
          if (address9) {
            elements3.push(address9);
            text3 += address9.textValue;
            labelled1.min = address9;
            var address11 = null;
            var slice14 = null;
            if (this._input.length > this._offset) {
              slice14 = this._input.substring(this._offset, this._offset + 2);
            } else {
              slice14 = null;
            }
            if (slice14 === ",}") {
              var klass11 = this.constructor.SyntaxNode;
              var type12 = null;
              address11 = new klass11(",}", this._offset, []);
              if (typeof type12 === "object") {
                extend(address11, type12);
              }
              this._offset += 2;
            } else {
              address11 = null;
              var slice15 = null;
              if (this._input.length > this._offset) {
                slice15 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice15 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\",}\""};
              }
            }
            if (address11) {
              elements3.push(address11);
              text3 += address11.textValue;
            } else {
              elements3 = null;
              this._offset = index5;
            }
          } else {
            elements3 = null;
            this._offset = index5;
          }
        } else {
          elements3 = null;
          this._offset = index5;
        }
        if (elements3) {
          this._offset = index5;
          var klass12 = this.constructor.SyntaxNode;
          var type13 = null;
          address0 = new klass12(text3, this._offset, elements3, labelled1);
          if (typeof type13 === "object") {
            extend(address0, type13);
          }
          this._offset += text3.length;
        } else {
          address0 = null;
        }
        if (address0) {
          var type14 = find(this.constructor, "RepeatSpec");
          if (typeof type14 === "object") {
            extend(address0, type14);
          }
        } else {
          this._offset = index1;
          var index7 = this._offset, elements5 = [], labelled2 = {}, text5 = "";
          var address12 = null;
          var slice16 = null;
          if (this._input.length > this._offset) {
            slice16 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice16 = null;
          }
          if (slice16 === "{") {
            var klass13 = this.constructor.SyntaxNode;
            var type15 = null;
            address12 = new klass13("{", this._offset, []);
            if (typeof type15 === "object") {
              extend(address12, type15);
            }
            this._offset += 1;
          } else {
            address12 = null;
            var slice17 = null;
            if (this._input.length > this._offset) {
              slice17 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice17 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"{\""};
            }
          }
          if (address12) {
            elements5.push(address12);
            text5 += address12.textValue;
            var address13 = null;
            var remaining3 = 1, index8 = this._offset, elements6 = [], text6 = "", address14 = true;
            while (address14) {
              var slice18 = null;
              if (this._input.length > this._offset) {
                slice18 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice18 = null;
              }
              if (slice18 && /^[0-9]/.test(slice18)) {
                var klass14 = this.constructor.SyntaxNode;
                var type16 = null;
                address14 = new klass14(slice18, this._offset, []);
                if (typeof type16 === "object") {
                  extend(address14, type16);
                }
                this._offset += 1;
              } else {
                address14 = null;
                var slice19 = null;
                if (this._input.length > this._offset) {
                  slice19 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice19 = null;
                }
                if (!this.error || this.error.offset <= this._offset) {
                  this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9]"};
                }
              }
              if (address14) {
                elements6.push(address14);
                text6 += address14.textValue;
                remaining3 -= 1;
              }
            }
            if (remaining3 <= 0) {
              this._offset = index8;
              var klass15 = this.constructor.SyntaxNode;
              var type17 = null;
              address13 = new klass15(text6, this._offset, elements6);
              if (typeof type17 === "object") {
                extend(address13, type17);
              }
              this._offset += text6.length;
            } else {
              address13 = null;
            }
            if (address13) {
              elements5.push(address13);
              text5 += address13.textValue;
              labelled2.exact = address13;
              var address15 = null;
              var slice20 = null;
              if (this._input.length > this._offset) {
                slice20 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice20 = null;
              }
              if (slice20 === "}") {
                var klass16 = this.constructor.SyntaxNode;
                var type18 = null;
                address15 = new klass16("}", this._offset, []);
                if (typeof type18 === "object") {
                  extend(address15, type18);
                }
                this._offset += 1;
              } else {
                address15 = null;
                var slice21 = null;
                if (this._input.length > this._offset) {
                  slice21 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice21 = null;
                }
                if (!this.error || this.error.offset <= this._offset) {
                  this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"}\""};
                }
              }
              if (address15) {
                elements5.push(address15);
                text5 += address15.textValue;
              } else {
                elements5 = null;
                this._offset = index7;
              }
            } else {
              elements5 = null;
              this._offset = index7;
            }
          } else {
            elements5 = null;
            this._offset = index7;
          }
          if (elements5) {
            this._offset = index7;
            var klass17 = this.constructor.SyntaxNode;
            var type19 = null;
            address0 = new klass17(text5, this._offset, elements5, labelled2);
            if (typeof type19 === "object") {
              extend(address0, type19);
            }
            this._offset += text5.length;
          } else {
            address0 = null;
          }
          if (address0) {
            var type20 = find(this.constructor, "RepeatSpec");
            if (typeof type20 === "object") {
              extend(address0, type20);
            }
          } else {
            this._offset = index1;
          }
        }
      }
      return this._nodeCache["repeat_spec"][index0] = address0;
    },
    __consume__subexp: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["subexp"] = this._nodeCache["subexp"] || {};
      var cached = this._nodeCache["subexp"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "(") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("(", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"(\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var index2 = this._offset;
        var index3 = this._offset;
        var slice2 = null;
        if (this._input.length > this._offset) {
          slice2 = this._input.substring(this._offset, this._offset + 2);
        } else {
          slice2 = null;
        }
        if (slice2 === "?:") {
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address2 = new klass1("?:", this._offset, []);
          if (typeof type1 === "object") {
            extend(address2, type1);
          }
          this._offset += 2;
        } else {
          address2 = null;
          var slice3 = null;
          if (this._input.length > this._offset) {
            slice3 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice3 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"?:\""};
          }
        }
        if (address2) {
        } else {
          this._offset = index3;
          var slice4 = null;
          if (this._input.length > this._offset) {
            slice4 = this._input.substring(this._offset, this._offset + 2);
          } else {
            slice4 = null;
          }
          if (slice4 === "?=") {
            var klass2 = this.constructor.SyntaxNode;
            var type2 = null;
            address2 = new klass2("?=", this._offset, []);
            if (typeof type2 === "object") {
              extend(address2, type2);
            }
            this._offset += 2;
          } else {
            address2 = null;
            var slice5 = null;
            if (this._input.length > this._offset) {
              slice5 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice5 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"?=\""};
            }
          }
          if (address2) {
          } else {
            this._offset = index3;
            var slice6 = null;
            if (this._input.length > this._offset) {
              slice6 = this._input.substring(this._offset, this._offset + 2);
            } else {
              slice6 = null;
            }
            if (slice6 === "?!") {
              var klass3 = this.constructor.SyntaxNode;
              var type3 = null;
              address2 = new klass3("?!", this._offset, []);
              if (typeof type3 === "object") {
                extend(address2, type3);
              }
              this._offset += 2;
            } else {
              address2 = null;
              var slice7 = null;
              if (this._input.length > this._offset) {
                slice7 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice7 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"?!\""};
              }
            }
            if (address2) {
            } else {
              this._offset = index3;
            }
          }
        }
        if (address2) {
        } else {
          this._offset = index2;
          var klass4 = this.constructor.SyntaxNode;
          var type4 = null;
          address2 = new klass4("", this._offset, []);
          if (typeof type4 === "object") {
            extend(address2, type4);
          }
          this._offset += 0;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.capture = address2;
          var address3 = null;
          address3 = this.__consume__regexp();
          if (address3) {
            elements0.push(address3);
            text0 += address3.textValue;
            labelled0.regexp = address3;
            var address4 = null;
            var slice8 = null;
            if (this._input.length > this._offset) {
              slice8 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice8 = null;
            }
            if (slice8 === ")") {
              var klass5 = this.constructor.SyntaxNode;
              var type5 = null;
              address4 = new klass5(")", this._offset, []);
              if (typeof type5 === "object") {
                extend(address4, type5);
              }
              this._offset += 1;
            } else {
              address4 = null;
              var slice9 = null;
              if (this._input.length > this._offset) {
                slice9 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice9 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\")\""};
              }
            }
            if (address4) {
              elements0.push(address4);
              text0 += address4.textValue;
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass6 = this.constructor.SyntaxNode;
        var type6 = find(this.constructor, "Subexp");
        address0 = new klass6(text0, this._offset, elements0, labelled0);
        if (typeof type6 === "object") {
          extend(address0, type6);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["subexp"][index0] = address0;
    },
    __consume__charset: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["charset"] = this._nodeCache["charset"] || {};
      var cached = this._nodeCache["charset"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "[") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("[", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"[\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var index2 = this._offset;
        var slice2 = null;
        if (this._input.length > this._offset) {
          slice2 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice2 = null;
        }
        if (slice2 === "^") {
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address2 = new klass1("^", this._offset, []);
          if (typeof type1 === "object") {
            extend(address2, type1);
          }
          this._offset += 1;
        } else {
          address2 = null;
          var slice3 = null;
          if (this._input.length > this._offset) {
            slice3 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice3 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"^\""};
          }
        }
        if (address2) {
        } else {
          this._offset = index2;
          var klass2 = this.constructor.SyntaxNode;
          var type2 = null;
          address2 = new klass2("", this._offset, []);
          if (typeof type2 === "object") {
            extend(address2, type2);
          }
          this._offset += 0;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.invert = address2;
          var address3 = null;
          var remaining0 = 0, index3 = this._offset, elements1 = [], text1 = "", address4 = true;
          while (address4) {
            var index4 = this._offset;
            address4 = this.__consume__charset_range();
            if (address4) {
            } else {
              this._offset = index4;
              address4 = this.__consume__charset_terminal();
              if (address4) {
              } else {
                this._offset = index4;
              }
            }
            if (address4) {
              elements1.push(address4);
              text1 += address4.textValue;
              remaining0 -= 1;
            }
          }
          if (remaining0 <= 0) {
            this._offset = index3;
            var klass3 = this.constructor.SyntaxNode;
            var type3 = null;
            address3 = new klass3(text1, this._offset, elements1);
            if (typeof type3 === "object") {
              extend(address3, type3);
            }
            this._offset += text1.length;
          } else {
            address3 = null;
          }
          if (address3) {
            elements0.push(address3);
            text0 += address3.textValue;
            labelled0.parts = address3;
            var address5 = null;
            var slice4 = null;
            if (this._input.length > this._offset) {
              slice4 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice4 = null;
            }
            if (slice4 === "]") {
              var klass4 = this.constructor.SyntaxNode;
              var type4 = null;
              address5 = new klass4("]", this._offset, []);
              if (typeof type4 === "object") {
                extend(address5, type4);
              }
              this._offset += 1;
            } else {
              address5 = null;
              var slice5 = null;
              if (this._input.length > this._offset) {
                slice5 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice5 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"]\""};
              }
            }
            if (address5) {
              elements0.push(address5);
              text0 += address5.textValue;
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass5 = this.constructor.SyntaxNode;
        var type5 = find(this.constructor, "Charset");
        address0 = new klass5(text0, this._offset, elements0, labelled0);
        if (typeof type5 === "object") {
          extend(address0, type5);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["charset"][index0] = address0;
    },
    __consume__charset_range: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["charset_range"] = this._nodeCache["charset_range"] || {};
      var cached = this._nodeCache["charset_range"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      address1 = this.__consume__charset_range_terminal();
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.first = address1;
        var address2 = null;
        var slice0 = null;
        if (this._input.length > this._offset) {
          slice0 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice0 = null;
        }
        if (slice0 === "-") {
          var klass0 = this.constructor.SyntaxNode;
          var type0 = null;
          address2 = new klass0("-", this._offset, []);
          if (typeof type0 === "object") {
            extend(address2, type0);
          }
          this._offset += 1;
        } else {
          address2 = null;
          var slice1 = null;
          if (this._input.length > this._offset) {
            slice1 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice1 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"-\""};
          }
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address3 = null;
          address3 = this.__consume__charset_range_terminal();
          if (address3) {
            elements0.push(address3);
            text0 += address3.textValue;
            labelled0.last = address3;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass1 = this.constructor.SyntaxNode;
        var type1 = find(this.constructor, "CharsetRange");
        address0 = new klass1(text0, this._offset, elements0, labelled0);
        if (typeof type1 === "object") {
          extend(address0, type1);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["charset_range"][index0] = address0;
    },
    __consume__charset_terminal: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["charset_terminal"] = this._nodeCache["charset_terminal"] || {};
      var cached = this._nodeCache["charset_terminal"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      address0 = this.__consume__charset_escape();
      var type0 = find(this.constructor, "CharsetEscape");
      if (typeof type0 === "object") {
        extend(address0, type0);
      }
      if (address0) {
      } else {
        this._offset = index1;
        address0 = this.__consume__charset_literal();
        var type1 = find(this.constructor, "Literal");
        if (typeof type1 === "object") {
          extend(address0, type1);
        }
        if (address0) {
        } else {
          this._offset = index1;
        }
      }
      return this._nodeCache["charset_terminal"][index0] = address0;
    },
    __consume__charset_range_terminal: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["charset_range_terminal"] = this._nodeCache["charset_range_terminal"] || {};
      var cached = this._nodeCache["charset_range_terminal"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      address0 = this.__consume__charset_range_escape();
      var type0 = find(this.constructor, "CharsetEscape");
      if (typeof type0 === "object") {
        extend(address0, type0);
      }
      if (address0) {
      } else {
        this._offset = index1;
        address0 = this.__consume__charset_literal();
        var type1 = find(this.constructor, "Literal");
        if (typeof type1 === "object") {
          extend(address0, type1);
        }
        if (address0) {
        } else {
          this._offset = index1;
        }
      }
      return this._nodeCache["charset_range_terminal"][index0] = address0;
    },
    __consume__charset_escape: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["charset_escape"] = this._nodeCache["charset_escape"] || {};
      var cached = this._nodeCache["charset_escape"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "\\") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("\\", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\\\\\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var index2 = this._offset;
        var index3 = this._offset, elements1 = [], labelled1 = {}, text1 = "";
        var address3 = null;
        var slice2 = null;
        if (this._input.length > this._offset) {
          slice2 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice2 = null;
        }
        if (slice2 && /^[bdDfnrsStvwW]/.test(slice2)) {
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address3 = new klass1(slice2, this._offset, []);
          if (typeof type1 === "object") {
            extend(address3, type1);
          }
          this._offset += 1;
        } else {
          address3 = null;
          var slice3 = null;
          if (this._input.length > this._offset) {
            slice3 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice3 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[bdDfnrsStvwW]"};
          }
        }
        if (address3) {
          elements1.push(address3);
          text1 += address3.textValue;
          labelled1.code = address3;
          var address4 = null;
          var index4 = this._offset;
          var slice4 = null;
          if (this._input.length > this._offset) {
            slice4 = this._input.substring(this._offset, this._offset + 0);
          } else {
            slice4 = null;
          }
          if (slice4 === "") {
            var klass2 = this.constructor.SyntaxNode;
            var type2 = null;
            address4 = new klass2("", this._offset, []);
            if (typeof type2 === "object") {
              extend(address4, type2);
            }
            this._offset += 0;
          } else {
            address4 = null;
            var slice5 = null;
            if (this._input.length > this._offset) {
              slice5 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice5 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\""};
            }
          }
          if (address4) {
          } else {
            this._offset = index4;
            var klass3 = this.constructor.SyntaxNode;
            var type3 = null;
            address4 = new klass3("", this._offset, []);
            if (typeof type3 === "object") {
              extend(address4, type3);
            }
            this._offset += 0;
          }
          if (address4) {
            elements1.push(address4);
            text1 += address4.textValue;
            labelled1.arg = address4;
          } else {
            elements1 = null;
            this._offset = index3;
          }
        } else {
          elements1 = null;
          this._offset = index3;
        }
        if (elements1) {
          this._offset = index3;
          var klass4 = this.constructor.SyntaxNode;
          var type4 = null;
          address2 = new klass4(text1, this._offset, elements1, labelled1);
          if (typeof type4 === "object") {
            extend(address2, type4);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
        } else {
          this._offset = index2;
          address2 = this.__consume__control_escape();
          if (address2) {
          } else {
            this._offset = index2;
            address2 = this.__consume__octal_escape();
            if (address2) {
            } else {
              this._offset = index2;
              address2 = this.__consume__hex_escape();
              if (address2) {
              } else {
                this._offset = index2;
                address2 = this.__consume__unicode_escape();
                if (address2) {
                } else {
                  this._offset = index2;
                  address2 = this.__consume__null_escape();
                  if (address2) {
                  } else {
                    this._offset = index2;
                  }
                }
              }
            }
          }
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.esc = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass5 = this.constructor.SyntaxNode;
        var type5 = null;
        address0 = new klass5(text0, this._offset, elements0, labelled0);
        if (typeof type5 === "object") {
          extend(address0, type5);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["charset_escape"][index0] = address0;
    },
    __consume__charset_range_escape: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["charset_range_escape"] = this._nodeCache["charset_range_escape"] || {};
      var cached = this._nodeCache["charset_range_escape"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "\\") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("\\", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\\\\\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var index2 = this._offset;
        var index3 = this._offset, elements1 = [], labelled1 = {}, text1 = "";
        var address3 = null;
        var slice2 = null;
        if (this._input.length > this._offset) {
          slice2 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice2 = null;
        }
        if (slice2 && /^[bfnrtv]/.test(slice2)) {
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address3 = new klass1(slice2, this._offset, []);
          if (typeof type1 === "object") {
            extend(address3, type1);
          }
          this._offset += 1;
        } else {
          address3 = null;
          var slice3 = null;
          if (this._input.length > this._offset) {
            slice3 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice3 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[bfnrtv]"};
          }
        }
        if (address3) {
          elements1.push(address3);
          text1 += address3.textValue;
          labelled1.code = address3;
          var address4 = null;
          var index4 = this._offset;
          var slice4 = null;
          if (this._input.length > this._offset) {
            slice4 = this._input.substring(this._offset, this._offset + 0);
          } else {
            slice4 = null;
          }
          if (slice4 === "") {
            var klass2 = this.constructor.SyntaxNode;
            var type2 = null;
            address4 = new klass2("", this._offset, []);
            if (typeof type2 === "object") {
              extend(address4, type2);
            }
            this._offset += 0;
          } else {
            address4 = null;
            var slice5 = null;
            if (this._input.length > this._offset) {
              slice5 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice5 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\""};
            }
          }
          if (address4) {
          } else {
            this._offset = index4;
            var klass3 = this.constructor.SyntaxNode;
            var type3 = null;
            address4 = new klass3("", this._offset, []);
            if (typeof type3 === "object") {
              extend(address4, type3);
            }
            this._offset += 0;
          }
          if (address4) {
            elements1.push(address4);
            text1 += address4.textValue;
            labelled1.arg = address4;
          } else {
            elements1 = null;
            this._offset = index3;
          }
        } else {
          elements1 = null;
          this._offset = index3;
        }
        if (elements1) {
          this._offset = index3;
          var klass4 = this.constructor.SyntaxNode;
          var type4 = null;
          address2 = new klass4(text1, this._offset, elements1, labelled1);
          if (typeof type4 === "object") {
            extend(address2, type4);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
        } else {
          this._offset = index2;
          address2 = this.__consume__control_escape();
          if (address2) {
          } else {
            this._offset = index2;
            address2 = this.__consume__octal_escape();
            if (address2) {
            } else {
              this._offset = index2;
              address2 = this.__consume__hex_escape();
              if (address2) {
              } else {
                this._offset = index2;
                address2 = this.__consume__unicode_escape();
                if (address2) {
                } else {
                  this._offset = index2;
                  address2 = this.__consume__null_escape();
                  if (address2) {
                  } else {
                    this._offset = index2;
                  }
                }
              }
            }
          }
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.esc = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass5 = this.constructor.SyntaxNode;
        var type5 = null;
        address0 = new klass5(text0, this._offset, elements0, labelled0);
        if (typeof type5 === "object") {
          extend(address0, type5);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["charset_range_escape"][index0] = address0;
    },
    __consume__charset_literal: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["charset_literal"] = this._nodeCache["charset_literal"] || {};
      var cached = this._nodeCache["charset_literal"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      var index2 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var index3 = this._offset;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 0);
      } else {
        slice0 = null;
      }
      if (slice0 === "") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 0;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\""};
        }
      }
      if (address1) {
      } else {
        this._offset = index3;
        var klass1 = this.constructor.SyntaxNode;
        var type1 = null;
        address1 = new klass1("", this._offset, []);
        if (typeof type1 === "object") {
          extend(address1, type1);
        }
        this._offset += 0;
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var slice2 = null;
        if (this._input.length > this._offset) {
          slice2 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice2 = null;
        }
        if (slice2 && /^[^\\\]]/.test(slice2)) {
          var klass2 = this.constructor.SyntaxNode;
          var type2 = null;
          address2 = new klass2(slice2, this._offset, []);
          if (typeof type2 === "object") {
            extend(address2, type2);
          }
          this._offset += 1;
        } else {
          address2 = null;
          var slice3 = null;
          if (this._input.length > this._offset) {
            slice3 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice3 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[^\\\\\\]]"};
          }
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.literal = address2;
        } else {
          elements0 = null;
          this._offset = index2;
        }
      } else {
        elements0 = null;
        this._offset = index2;
      }
      if (elements0) {
        this._offset = index2;
        var klass3 = this.constructor.SyntaxNode;
        var type3 = null;
        address0 = new klass3(text0, this._offset, elements0, labelled0);
        if (typeof type3 === "object") {
          extend(address0, type3);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      if (address0) {
      } else {
        this._offset = index1;
        var index4 = this._offset, elements1 = [], labelled1 = {}, text1 = "";
        var address3 = null;
        var slice4 = null;
        if (this._input.length > this._offset) {
          slice4 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice4 = null;
        }
        if (slice4 === "\\") {
          var klass4 = this.constructor.SyntaxNode;
          var type4 = null;
          address3 = new klass4("\\", this._offset, []);
          if (typeof type4 === "object") {
            extend(address3, type4);
          }
          this._offset += 1;
        } else {
          address3 = null;
          var slice5 = null;
          if (this._input.length > this._offset) {
            slice5 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice5 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\\\\\""};
          }
        }
        if (address3) {
          elements1.push(address3);
          text1 += address3.textValue;
          labelled1.literal = address3;
          var address4 = null;
          var index5 = this._offset;
          var slice6 = null;
          if (this._input.length > this._offset) {
            slice6 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice6 = null;
          }
          if (slice6 === "c") {
            var klass5 = this.constructor.SyntaxNode;
            var type5 = null;
            address4 = new klass5("c", this._offset, []);
            if (typeof type5 === "object") {
              extend(address4, type5);
            }
            this._offset += 1;
          } else {
            address4 = null;
            var slice7 = null;
            if (this._input.length > this._offset) {
              slice7 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice7 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"c\""};
            }
          }
          this._offset = index5;
          if (address4) {
            var klass6 = this.constructor.SyntaxNode;
            var type6 = null;
            address4 = new klass6("", this._offset, []);
            if (typeof type6 === "object") {
              extend(address4, type6);
            }
            this._offset += 0;
          } else {
            address4 = null;
          }
          if (address4) {
            elements1.push(address4);
            text1 += address4.textValue;
          } else {
            elements1 = null;
            this._offset = index4;
          }
        } else {
          elements1 = null;
          this._offset = index4;
        }
        if (elements1) {
          this._offset = index4;
          var klass7 = this.constructor.SyntaxNode;
          var type7 = null;
          address0 = new klass7(text1, this._offset, elements1, labelled1);
          if (typeof type7 === "object") {
            extend(address0, type7);
          }
          this._offset += text1.length;
        } else {
          address0 = null;
        }
        if (address0) {
        } else {
          this._offset = index1;
          var index6 = this._offset, elements2 = [], labelled2 = {}, text2 = "";
          var address5 = null;
          var slice8 = null;
          if (this._input.length > this._offset) {
            slice8 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice8 = null;
          }
          if (slice8 === "\\") {
            var klass8 = this.constructor.SyntaxNode;
            var type8 = null;
            address5 = new klass8("\\", this._offset, []);
            if (typeof type8 === "object") {
              extend(address5, type8);
            }
            this._offset += 1;
          } else {
            address5 = null;
            var slice9 = null;
            if (this._input.length > this._offset) {
              slice9 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice9 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\\\\\""};
            }
          }
          if (address5) {
            elements2.push(address5);
            text2 += address5.textValue;
            var address6 = null;
            var slice10 = null;
            if (this._input.length > this._offset) {
              slice10 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice10 = null;
            }
            if (slice10 && /^[^bdDfnrsStvwW]/.test(slice10)) {
              var klass9 = this.constructor.SyntaxNode;
              var type9 = null;
              address6 = new klass9(slice10, this._offset, []);
              if (typeof type9 === "object") {
                extend(address6, type9);
              }
              this._offset += 1;
            } else {
              address6 = null;
              var slice11 = null;
              if (this._input.length > this._offset) {
                slice11 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice11 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[^bdDfnrsStvwW]"};
              }
            }
            if (address6) {
              elements2.push(address6);
              text2 += address6.textValue;
              labelled2.literal = address6;
            } else {
              elements2 = null;
              this._offset = index6;
            }
          } else {
            elements2 = null;
            this._offset = index6;
          }
          if (elements2) {
            this._offset = index6;
            var klass10 = this.constructor.SyntaxNode;
            var type10 = null;
            address0 = new klass10(text2, this._offset, elements2, labelled2);
            if (typeof type10 === "object") {
              extend(address0, type10);
            }
            this._offset += text2.length;
          } else {
            address0 = null;
          }
          if (address0) {
          } else {
            this._offset = index1;
          }
        }
      }
      return this._nodeCache["charset_literal"][index0] = address0;
    },
    __consume__terminal: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["terminal"] = this._nodeCache["terminal"] || {};
      var cached = this._nodeCache["terminal"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === ".") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = find(this.constructor, "AnyCharacter");
        address0 = new klass0(".", this._offset, []);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += 1;
      } else {
        address0 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\".\""};
        }
      }
      if (address0) {
      } else {
        this._offset = index1;
        address0 = this.__consume__escape();
        var type1 = find(this.constructor, "Escape");
        if (typeof type1 === "object") {
          extend(address0, type1);
        }
        if (address0) {
        } else {
          this._offset = index1;
          address0 = this.__consume__literal();
          var type2 = find(this.constructor, "Literal");
          if (typeof type2 === "object") {
            extend(address0, type2);
          }
          if (address0) {
          } else {
            this._offset = index1;
          }
        }
      }
      return this._nodeCache["terminal"][index0] = address0;
    },
    __consume__escape: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["escape"] = this._nodeCache["escape"] || {};
      var cached = this._nodeCache["escape"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "\\") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("\\", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\\\\\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var index2 = this._offset;
        var index3 = this._offset, elements1 = [], labelled1 = {}, text1 = "";
        var address3 = null;
        var slice2 = null;
        if (this._input.length > this._offset) {
          slice2 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice2 = null;
        }
        if (slice2 && /^[bBdDfnrsStvwW1-9]/.test(slice2)) {
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address3 = new klass1(slice2, this._offset, []);
          if (typeof type1 === "object") {
            extend(address3, type1);
          }
          this._offset += 1;
        } else {
          address3 = null;
          var slice3 = null;
          if (this._input.length > this._offset) {
            slice3 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice3 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[bBdDfnrsStvwW1-9]"};
          }
        }
        if (address3) {
          elements1.push(address3);
          text1 += address3.textValue;
          labelled1.code = address3;
          var address4 = null;
          var index4 = this._offset;
          var slice4 = null;
          if (this._input.length > this._offset) {
            slice4 = this._input.substring(this._offset, this._offset + 0);
          } else {
            slice4 = null;
          }
          if (slice4 === "") {
            var klass2 = this.constructor.SyntaxNode;
            var type2 = null;
            address4 = new klass2("", this._offset, []);
            if (typeof type2 === "object") {
              extend(address4, type2);
            }
            this._offset += 0;
          } else {
            address4 = null;
            var slice5 = null;
            if (this._input.length > this._offset) {
              slice5 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice5 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\""};
            }
          }
          if (address4) {
          } else {
            this._offset = index4;
            var klass3 = this.constructor.SyntaxNode;
            var type3 = null;
            address4 = new klass3("", this._offset, []);
            if (typeof type3 === "object") {
              extend(address4, type3);
            }
            this._offset += 0;
          }
          if (address4) {
            elements1.push(address4);
            text1 += address4.textValue;
            labelled1.arg = address4;
          } else {
            elements1 = null;
            this._offset = index3;
          }
        } else {
          elements1 = null;
          this._offset = index3;
        }
        if (elements1) {
          this._offset = index3;
          var klass4 = this.constructor.SyntaxNode;
          var type4 = null;
          address2 = new klass4(text1, this._offset, elements1, labelled1);
          if (typeof type4 === "object") {
            extend(address2, type4);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
        } else {
          this._offset = index2;
          address2 = this.__consume__control_escape();
          if (address2) {
          } else {
            this._offset = index2;
            address2 = this.__consume__octal_escape();
            if (address2) {
            } else {
              this._offset = index2;
              address2 = this.__consume__hex_escape();
              if (address2) {
              } else {
                this._offset = index2;
                address2 = this.__consume__unicode_escape();
                if (address2) {
                } else {
                  this._offset = index2;
                  address2 = this.__consume__null_escape();
                  if (address2) {
                  } else {
                    this._offset = index2;
                  }
                }
              }
            }
          }
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.esc = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass5 = this.constructor.SyntaxNode;
        var type5 = null;
        address0 = new klass5(text0, this._offset, elements0, labelled0);
        if (typeof type5 === "object") {
          extend(address0, type5);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["escape"][index0] = address0;
    },
    __consume__literal: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["literal"] = this._nodeCache["literal"] || {};
      var cached = this._nodeCache["literal"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset;
      var index2 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var index3 = this._offset;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 0);
      } else {
        slice0 = null;
      }
      if (slice0 === "") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 0;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\""};
        }
      }
      if (address1) {
      } else {
        this._offset = index3;
        var klass1 = this.constructor.SyntaxNode;
        var type1 = null;
        address1 = new klass1("", this._offset, []);
        if (typeof type1 === "object") {
          extend(address1, type1);
        }
        this._offset += 0;
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var slice2 = null;
        if (this._input.length > this._offset) {
          slice2 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice2 = null;
        }
        if (slice2 && /^[^|\\/.\[\(\)?+*$^]/.test(slice2)) {
          var klass2 = this.constructor.SyntaxNode;
          var type2 = null;
          address2 = new klass2(slice2, this._offset, []);
          if (typeof type2 === "object") {
            extend(address2, type2);
          }
          this._offset += 1;
        } else {
          address2 = null;
          var slice3 = null;
          if (this._input.length > this._offset) {
            slice3 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice3 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[^|\\\\/.\\[\\(\\)?+*$^]"};
          }
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.literal = address2;
        } else {
          elements0 = null;
          this._offset = index2;
        }
      } else {
        elements0 = null;
        this._offset = index2;
      }
      if (elements0) {
        this._offset = index2;
        var klass3 = this.constructor.SyntaxNode;
        var type3 = null;
        address0 = new klass3(text0, this._offset, elements0, labelled0);
        if (typeof type3 === "object") {
          extend(address0, type3);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      if (address0) {
      } else {
        this._offset = index1;
        var index4 = this._offset, elements1 = [], labelled1 = {}, text1 = "";
        var address3 = null;
        var slice4 = null;
        if (this._input.length > this._offset) {
          slice4 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice4 = null;
        }
        if (slice4 === "\\") {
          var klass4 = this.constructor.SyntaxNode;
          var type4 = null;
          address3 = new klass4("\\", this._offset, []);
          if (typeof type4 === "object") {
            extend(address3, type4);
          }
          this._offset += 1;
        } else {
          address3 = null;
          var slice5 = null;
          if (this._input.length > this._offset) {
            slice5 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice5 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\\\\\""};
          }
        }
        if (address3) {
          elements1.push(address3);
          text1 += address3.textValue;
          labelled1.literal = address3;
          var address4 = null;
          var index5 = this._offset;
          var slice6 = null;
          if (this._input.length > this._offset) {
            slice6 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice6 = null;
          }
          if (slice6 === "c") {
            var klass5 = this.constructor.SyntaxNode;
            var type5 = null;
            address4 = new klass5("c", this._offset, []);
            if (typeof type5 === "object") {
              extend(address4, type5);
            }
            this._offset += 1;
          } else {
            address4 = null;
            var slice7 = null;
            if (this._input.length > this._offset) {
              slice7 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice7 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"c\""};
            }
          }
          this._offset = index5;
          if (address4) {
            var klass6 = this.constructor.SyntaxNode;
            var type6 = null;
            address4 = new klass6("", this._offset, []);
            if (typeof type6 === "object") {
              extend(address4, type6);
            }
            this._offset += 0;
          } else {
            address4 = null;
          }
          if (address4) {
            elements1.push(address4);
            text1 += address4.textValue;
          } else {
            elements1 = null;
            this._offset = index4;
          }
        } else {
          elements1 = null;
          this._offset = index4;
        }
        if (elements1) {
          this._offset = index4;
          var klass7 = this.constructor.SyntaxNode;
          var type7 = null;
          address0 = new klass7(text1, this._offset, elements1, labelled1);
          if (typeof type7 === "object") {
            extend(address0, type7);
          }
          this._offset += text1.length;
        } else {
          address0 = null;
        }
        if (address0) {
        } else {
          this._offset = index1;
          var index6 = this._offset, elements2 = [], labelled2 = {}, text2 = "";
          var address5 = null;
          var slice8 = null;
          if (this._input.length > this._offset) {
            slice8 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice8 = null;
          }
          if (slice8 === "\\") {
            var klass8 = this.constructor.SyntaxNode;
            var type8 = null;
            address5 = new klass8("\\", this._offset, []);
            if (typeof type8 === "object") {
              extend(address5, type8);
            }
            this._offset += 1;
          } else {
            address5 = null;
            var slice9 = null;
            if (this._input.length > this._offset) {
              slice9 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice9 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\\\\\""};
            }
          }
          if (address5) {
            elements2.push(address5);
            text2 += address5.textValue;
            var address6 = null;
            var slice10 = null;
            if (this._input.length > this._offset) {
              slice10 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice10 = null;
            }
            var temp0 = slice10;
            if (temp0 === null) {
              address6 = null;
              var slice11 = null;
              if (this._input.length > this._offset) {
                slice11 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice11 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "<any char>"};
              }
            } else {
              var klass9 = this.constructor.SyntaxNode;
              var type9 = null;
              address6 = new klass9(temp0, this._offset, []);
              if (typeof type9 === "object") {
                extend(address6, type9);
              }
              this._offset += 1;
            }
            if (address6) {
              elements2.push(address6);
              text2 += address6.textValue;
              labelled2.literal = address6;
            } else {
              elements2 = null;
              this._offset = index6;
            }
          } else {
            elements2 = null;
            this._offset = index6;
          }
          if (elements2) {
            this._offset = index6;
            var klass10 = this.constructor.SyntaxNode;
            var type10 = null;
            address0 = new klass10(text2, this._offset, elements2, labelled2);
            if (typeof type10 === "object") {
              extend(address0, type10);
            }
            this._offset += text2.length;
          } else {
            address0 = null;
          }
          if (address0) {
          } else {
            this._offset = index1;
          }
        }
      }
      return this._nodeCache["literal"][index0] = address0;
    },
    __consume__control_escape: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["control_escape"] = this._nodeCache["control_escape"] || {};
      var cached = this._nodeCache["control_escape"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "c") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("c", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"c\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.code = address1;
        var address2 = null;
        var slice2 = null;
        if (this._input.length > this._offset) {
          slice2 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice2 = null;
        }
        if (slice2 && /^[a-zA-Z]/.test(slice2)) {
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address2 = new klass1(slice2, this._offset, []);
          if (typeof type1 === "object") {
            extend(address2, type1);
          }
          this._offset += 1;
        } else {
          address2 = null;
          var slice3 = null;
          if (this._input.length > this._offset) {
            slice3 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice3 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[a-zA-Z]"};
          }
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.arg = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass2 = this.constructor.SyntaxNode;
        var type2 = null;
        address0 = new klass2(text0, this._offset, elements0, labelled0);
        if (typeof type2 === "object") {
          extend(address0, type2);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["control_escape"][index0] = address0;
    },
    __consume__octal_escape: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["octal_escape"] = this._nodeCache["octal_escape"] || {};
      var cached = this._nodeCache["octal_escape"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "0") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("0", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"0\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.code = address1;
        var address2 = null;
        var remaining0 = 1, index2 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          var slice2 = null;
          if (this._input.length > this._offset) {
            slice2 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice2 = null;
          }
          if (slice2 && /^[0-7]/.test(slice2)) {
            var klass1 = this.constructor.SyntaxNode;
            var type1 = null;
            address3 = new klass1(slice2, this._offset, []);
            if (typeof type1 === "object") {
              extend(address3, type1);
            }
            this._offset += 1;
          } else {
            address3 = null;
            var slice3 = null;
            if (this._input.length > this._offset) {
              slice3 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice3 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-7]"};
            }
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var klass2 = this.constructor.SyntaxNode;
          var type2 = null;
          address2 = new klass2(text1, this._offset, elements1);
          if (typeof type2 === "object") {
            extend(address2, type2);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.arg = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass3 = this.constructor.SyntaxNode;
        var type3 = null;
        address0 = new klass3(text0, this._offset, elements0, labelled0);
        if (typeof type3 === "object") {
          extend(address0, type3);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["octal_escape"][index0] = address0;
    },
    __consume__hex_escape: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["hex_escape"] = this._nodeCache["hex_escape"] || {};
      var cached = this._nodeCache["hex_escape"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "x") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("x", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"x\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.code = address1;
        var address2 = null;
        var index2 = this._offset, elements1 = [], labelled1 = {}, text1 = "";
        var address3 = null;
        var slice2 = null;
        if (this._input.length > this._offset) {
          slice2 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice2 = null;
        }
        if (slice2 && /^[0-9a-fA-F]/.test(slice2)) {
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address3 = new klass1(slice2, this._offset, []);
          if (typeof type1 === "object") {
            extend(address3, type1);
          }
          this._offset += 1;
        } else {
          address3 = null;
          var slice3 = null;
          if (this._input.length > this._offset) {
            slice3 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice3 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9a-fA-F]"};
          }
        }
        if (address3) {
          elements1.push(address3);
          text1 += address3.textValue;
          var address4 = null;
          var slice4 = null;
          if (this._input.length > this._offset) {
            slice4 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice4 = null;
          }
          if (slice4 && /^[0-9a-fA-F]/.test(slice4)) {
            var klass2 = this.constructor.SyntaxNode;
            var type2 = null;
            address4 = new klass2(slice4, this._offset, []);
            if (typeof type2 === "object") {
              extend(address4, type2);
            }
            this._offset += 1;
          } else {
            address4 = null;
            var slice5 = null;
            if (this._input.length > this._offset) {
              slice5 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice5 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9a-fA-F]"};
            }
          }
          if (address4) {
            elements1.push(address4);
            text1 += address4.textValue;
          } else {
            elements1 = null;
            this._offset = index2;
          }
        } else {
          elements1 = null;
          this._offset = index2;
        }
        if (elements1) {
          this._offset = index2;
          var klass3 = this.constructor.SyntaxNode;
          var type3 = null;
          address2 = new klass3(text1, this._offset, elements1, labelled1);
          if (typeof type3 === "object") {
            extend(address2, type3);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.arg = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass4 = this.constructor.SyntaxNode;
        var type4 = null;
        address0 = new klass4(text0, this._offset, elements0, labelled0);
        if (typeof type4 === "object") {
          extend(address0, type4);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["hex_escape"][index0] = address0;
    },
    __consume__unicode_escape: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["unicode_escape"] = this._nodeCache["unicode_escape"] || {};
      var cached = this._nodeCache["unicode_escape"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "u") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("u", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"u\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.code = address1;
        var address2 = null;
        var index2 = this._offset, elements1 = [], labelled1 = {}, text1 = "";
        var address3 = null;
        var slice2 = null;
        if (this._input.length > this._offset) {
          slice2 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice2 = null;
        }
        if (slice2 && /^[0-9a-fA-F]/.test(slice2)) {
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address3 = new klass1(slice2, this._offset, []);
          if (typeof type1 === "object") {
            extend(address3, type1);
          }
          this._offset += 1;
        } else {
          address3 = null;
          var slice3 = null;
          if (this._input.length > this._offset) {
            slice3 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice3 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9a-fA-F]"};
          }
        }
        if (address3) {
          elements1.push(address3);
          text1 += address3.textValue;
          var address4 = null;
          var slice4 = null;
          if (this._input.length > this._offset) {
            slice4 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice4 = null;
          }
          if (slice4 && /^[0-9a-fA-F]/.test(slice4)) {
            var klass2 = this.constructor.SyntaxNode;
            var type2 = null;
            address4 = new klass2(slice4, this._offset, []);
            if (typeof type2 === "object") {
              extend(address4, type2);
            }
            this._offset += 1;
          } else {
            address4 = null;
            var slice5 = null;
            if (this._input.length > this._offset) {
              slice5 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice5 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9a-fA-F]"};
            }
          }
          if (address4) {
            elements1.push(address4);
            text1 += address4.textValue;
            var address5 = null;
            var slice6 = null;
            if (this._input.length > this._offset) {
              slice6 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice6 = null;
            }
            if (slice6 && /^[0-9a-fA-F]/.test(slice6)) {
              var klass3 = this.constructor.SyntaxNode;
              var type3 = null;
              address5 = new klass3(slice6, this._offset, []);
              if (typeof type3 === "object") {
                extend(address5, type3);
              }
              this._offset += 1;
            } else {
              address5 = null;
              var slice7 = null;
              if (this._input.length > this._offset) {
                slice7 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice7 = null;
              }
              if (!this.error || this.error.offset <= this._offset) {
                this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9a-fA-F]"};
              }
            }
            if (address5) {
              elements1.push(address5);
              text1 += address5.textValue;
              var address6 = null;
              var slice8 = null;
              if (this._input.length > this._offset) {
                slice8 = this._input.substring(this._offset, this._offset + 1);
              } else {
                slice8 = null;
              }
              if (slice8 && /^[0-9a-fA-F]/.test(slice8)) {
                var klass4 = this.constructor.SyntaxNode;
                var type4 = null;
                address6 = new klass4(slice8, this._offset, []);
                if (typeof type4 === "object") {
                  extend(address6, type4);
                }
                this._offset += 1;
              } else {
                address6 = null;
                var slice9 = null;
                if (this._input.length > this._offset) {
                  slice9 = this._input.substring(this._offset, this._offset + 1);
                } else {
                  slice9 = null;
                }
                if (!this.error || this.error.offset <= this._offset) {
                  this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9a-fA-F]"};
                }
              }
              if (address6) {
                elements1.push(address6);
                text1 += address6.textValue;
              } else {
                elements1 = null;
                this._offset = index2;
              }
            } else {
              elements1 = null;
              this._offset = index2;
            }
          } else {
            elements1 = null;
            this._offset = index2;
          }
        } else {
          elements1 = null;
          this._offset = index2;
        }
        if (elements1) {
          this._offset = index2;
          var klass5 = this.constructor.SyntaxNode;
          var type5 = null;
          address2 = new klass5(text1, this._offset, elements1, labelled1);
          if (typeof type5 === "object") {
            extend(address2, type5);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.arg = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass6 = this.constructor.SyntaxNode;
        var type6 = null;
        address0 = new klass6(text0, this._offset, elements0, labelled0);
        if (typeof type6 === "object") {
          extend(address0, type6);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["unicode_escape"][index0] = address0;
    },
    __consume__null_escape: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["null_escape"] = this._nodeCache["null_escape"] || {};
      var cached = this._nodeCache["null_escape"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "0") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("0", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"0\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.code = address1;
        var address2 = null;
        var index2 = this._offset;
        var slice2 = null;
        if (this._input.length > this._offset) {
          slice2 = this._input.substring(this._offset, this._offset + 0);
        } else {
          slice2 = null;
        }
        if (slice2 === "") {
          var klass1 = this.constructor.SyntaxNode;
          var type1 = null;
          address2 = new klass1("", this._offset, []);
          if (typeof type1 === "object") {
            extend(address2, type1);
          }
          this._offset += 0;
        } else {
          address2 = null;
          var slice3 = null;
          if (this._input.length > this._offset) {
            slice3 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice3 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"\""};
          }
        }
        if (address2) {
        } else {
          this._offset = index2;
          var klass2 = this.constructor.SyntaxNode;
          var type2 = null;
          address2 = new klass2("", this._offset, []);
          if (typeof type2 === "object") {
            extend(address2, type2);
          }
          this._offset += 0;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          labelled0.arg = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass3 = this.constructor.SyntaxNode;
        var type3 = null;
        address0 = new klass3(text0, this._offset, elements0, labelled0);
        if (typeof type3 === "object") {
          extend(address0, type3);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["null_escape"][index0] = address0;
    }
  };
  
  var Parser = function(input) {
    this._input = input;
    this._offset = 0;
    this._nodeCache = {};
  };
  
  Parser.prototype.parse = function() {
    var result = this.__consume__root();
    if (result && this._offset === this._input.length) {
      return result;
    }
    if (!(this.error)) {
      this.error = {input: this._input, offset: this._offset, expected: "<EOF>"};
    }
    var message = formatError(this.error);
    var error = new Error(message);
    throw error;
  };
  
  Parser.parse = function(input) {
    var parser = new Parser(input);
    return parser.parse();
  };
  
  extend(Parser.prototype, Grammar);
  
  var SyntaxNode = function(textValue, offset, elements, properties) {
    this.textValue = textValue;
    this.offset    = offset;
    this.elements  = elements || [];
    if (!properties) return;
    for (var key in properties) this[key] = properties[key];
  };
  
  SyntaxNode.prototype.forEach = function(block, context) {
    for (var i = 0, n = this.elements.length; i < n; i++) {
      block.call(context, this.elements[i], i);
    }
  };
  
  Parser.SyntaxNode = SyntaxNode;
  
  if (typeof require === "function" && typeof exports === "object") {
    exports.Grammar = Grammar;
    exports.Parser  = Parser;
    exports.parse   = Parser.parse;
    
  } else {
    var namespace = this;
    JavascriptRegexp = Grammar;
    JavascriptRegexpParser = Parser;
    JavascriptRegexpParser.formatError = formatError;
  }
})();

