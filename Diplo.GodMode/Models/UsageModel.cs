﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Umbraco.Core;

namespace Diplo.GodMode.Models
{
    /// <summary>
    /// Represents content usage
    /// </summary>
    public class UsageModel
    {
        /// <summary>
        /// Get the content type primary key Id
        /// </summary>
        public int Id { get; set; }

        public int NodeCount { get; set; }

        public string Description { get; set; }

        public string Alias { get; set; }

        public string Icon { get; set; }

        public Guid GuidType { get; set; }

        /// <summary>
        /// Gets a short "code" indicating the member type
        /// </summary>
        public string Type
        {
            get
            {
                if (this.GuidType == Constants.ObjectTypes.DocumentType)
                {
                    return "Content";
                }
                else if (this.GuidType == Constants.ObjectTypes.MediaType)
                {
                    return "Media";
                }
                else if (this.GuidType == Constants.ObjectTypes.MemberType)
                {
                    return "Members";
                }

                return "";
            }
        }
    }
}
